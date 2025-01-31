const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,//絶対書き込む
        maxlength: 20,//文字制限 あまり長いと見づらいため
    },
    date:{
        type: String,
        required: true,
    },
    XP:{
        type: Number,
        required: true,
    },
 }, { collection: 'subject' }); //コレクション名を明示

module.exports = mongoose.model('Subject', SubjectSchema);