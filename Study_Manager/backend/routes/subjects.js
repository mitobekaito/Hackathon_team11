const router = require('express').Router();
const Subject = require('../models/SubjectSchema');//StudySchemaをインポート

router.get('/', async(req, res) => {
    try{
        // _idフィールドのみを取得
        const subjects = await Subject.find({}, '_id');
        res.status(200).json(subjects);//json形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }  
});

router.get('/:id', async(req, res) => {
    try{
        //idから科目を取得
        const subject = await Subject.findById(req.params.id);
        if(!subject) return res.status(404).json({ message: "科目がありません" });//科目がない場合はエラーメッセージを返す
        res.status(200).json(subject);//json形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.post('/', async(req, res) => {
    try{
        console.log("受信したデータ：", req.body);//デバック用

        //リクエストから新しい科目を作成
        const newSubject = new Subject(req.body);

        //新しい科目をデータベースに保存
        const saveSubject = await newSubject.save();
        res.status(201).json(saveSubject);//科目をクライアントにjson形式で返す
    } catch(err){
        console.log("科目の追加エラー", err);//デバック用
        res.status(500).json({ error: "科目の追加に失敗しました", details: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.put('/:id/increase-xp', async (req, res) => {
    try {
        const { increment } = req.body; // どれだけ XP を増やすかをリクエストから取得

        // XP を更新
        const updatedSubject = await Subject.findByIdAndUpdate(
            req.params.id,
            { $inc: { xp: increment } }, // XP を増加
            { new: true }
        );

        if (!updatedSubject) return res.status(404).json({ error: "科目が見つかりません" });

        res.status(200).json(updatedSubject);
    } catch (err) {
        console.error("XP更新エラー:", err);
        res.status(500).json({ error: "XP の更新に失敗しました" });
    }
});

router.put('/:id', async(req, res) => {
    try{
        //idから科目を更新
        const updateSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updateSubject) return res.status(404).json({ message: "科目がありません" });//科目がない場合はエラーメッセージを返す
        res.status(200).json(updateSubject);//更新後の科目をjson形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

router.delete('/:id', async(req, res) => {
    try{
        //idから科目を削除
        const deleteSubject = await Subject.findByIdAndDelete(req.params.id);
        if(!deleteSubject) return res.status(404).json({ message: "科目がありません" });//科目がない場合はエラーメッセージを返す
        res.status(200).json({ message: "科目が削除されました" });//科目を削除した旨をjson形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
    }
});

module.exports = router;