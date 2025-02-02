const router = require('express').Router();
const Subject = require('../models/SubjectSchema');

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
        const newSubject = new Subject(req.body);
        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/increase-xp', async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, { $inc: { xp: req.body.increment } }, { new: true });
        if (!updatedSubject) return res.status(404).json({ message: "科目がありません" });
        res.status(200).json(updatedSubject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSubject) return res.status(404).json({ message: "科目がありません" });
        res.status(200).json(updatedSubject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        if (!deletedSubject) return res.status(404).json({ message: "科目がありません" });
        res.status(200).json({ message: "科目が削除されました" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;