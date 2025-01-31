const router = require('express').Router();
const Subject = require('../models/SubjectSchema');//StudySchemaをインポート

router.get('/', async(req, res) => {
    try{
        //データベースから全ての科目を取得
        const subjects = await Subject.find();
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
        //リクエストから新しい科目を作成
        const newSubject = new Subject(req.body)({
            name: req.body.name,
            date: req.body.date,
            XP: req.body.XP,
        });
        //新しい科目をデータベースに保存
        const saveSubject = await newSubject.save();
        res.status(201).json(saveSubject);//科目をクライアントにjson形式で返す
    } catch(err){
        res.status(500).json({ error: err.message });//エラーがあればエラーメッセージを返す
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