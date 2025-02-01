const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,//絶対書き込む
        maxlength: 20,//文字制限 あまり長いと見づらいため
    },
    description:{
        type: String,
        required: true,
    },
    priority:{
        type: Number,
        required: true,
        //優先度は1~5の範囲で設定しました。　ここは制限無しでもいいかもしれません。
        min : 1,
        max : 5,
    },
    understanding:{
        type: Number,
        required: true,
        //0~5の星評価で理解度を設定したいため、0~5の範囲で設定しました。
        min : 0,
        max : 5,
        default : 0,
    },
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject', //Subjectスキーマと紐付け
        required: true,
    }
 }, { collection: 'task' }); //コレクション名を明示

module.exports = mongoose.model('Task', TaskSchema);