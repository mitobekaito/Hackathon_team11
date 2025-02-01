const router = require('express').Router();
const Task = require('../models/TaskSchema'); //Taskスキーマをインポート

router.get('/', async(req, res) => {
  try{
    //Taskスキーマから全てのタスクを取得
    const tasks = await Task.find().populate("subjectId");
    res.status(200).json(tasks);//json形式で返す
  } catch(err){
    res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
  }  
});

router.get('/:id', async(req, res) => {
    try{
      //idからタスクを取得
      const task = await Task.findById(req.params.id);
      if(!task) return res.status(404).json({ message: "タスクがありません" });//タスクがない場合はエラーメッセージを返す
      res.status(200).json(task);//json形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.post('/', async(req, res) => {
    try{
      //リクエストから新しいタスクを作成
      const { title, description, priority, understanding, subjectid } = req.body;
      if (!title || !description || !priority || !subjectid) {
        return res.status(400).json({ error: "必要なフィールドが不足しています" });
      }
      const newtask = new Task({
        title,
        description,
        priority,
        understanding,
        subjectid
      });
      //新しいタスクをデータベースに保存
      const savetask = await newtask.save();
      const populatedTask = await savetask.populate("subjectId"); // `populate` を適用
      res.status(201).json(populatedTask);//タスクをクライアントにjson形式で返す
    } catch(err){
        console.error("タスクの追加に失敗:", err);
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.put('/:id', async(req, res) => {
    try{
      //idからタスクを更新
      const updatetask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if(!updatetask) return res.status(404).json({ message: "タスクがありません" });//タスクがない場合はエラーメッセージを返す
        res.status(200).json(updatetask);//更新後のタスクをjson形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.delete('/:id', async(req, res) => {
    try{
      //idからタスクを削除
      const deletetask = await Task.findByIdAndDelete(req.params.id);
      if(!deletetask) return res.status(404).json({ message: "タスクがありません" });//タスクがない場合はエラーメッセージを返す
      res.status(200).json({ message: "タスクが削除されました" });//タスクを削除した旨をjson形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

module.exports = router;