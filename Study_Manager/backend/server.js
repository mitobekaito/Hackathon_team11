const express = require('express');
const app = express();
// const userRouter = require('./routes/users');
// const authRouter = require('./routes/auth');
// const subjectRouter = require('./routes/subjects');
// const taskRouter = require('./routes/tasks');
const PORT = 3000;
const mongoose = require('mongoose');


require('dotenv').config();

// Connect to MongoDB
mongoose.connect("mongodb+srv://kaito:abc@cluster0.hy7ef.mongodb.net/threadBoard?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>
        console.log("888888888888888888888888888888")
    ).catch((err) =>
        console.log("エラーヨクキキトレマセンデシタ\n",err)
    );

// Middleware
app.use(express.json());

// Routesの読み込み　try-catchでエラーをキャッチ
// try{
//     app.use('/users', userRouter);
//     app.use('/auth', authRouter);
//     app.use('/subjects', subjectRouter);
//     app.use('/tasks', taskRouter);    
// } catch (err) {
//     console.log("ルートの読み込みエラー", err.message);
// }

//サーバテスト用
app.get('/', (req, res) => {
    res.send("サーバーは正常に動作しています");
});


// Serverを起動
app.listen(PORT, () => console.log("server is running on PORT" + PORT));
