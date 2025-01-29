const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const subjectRouter = require('./routes/subjects');
const taskRouter = require('./routes/tasks');
const PORT = 3000;
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        console.log("Connected to MongoDB")
    ).catch((err) =>
        console.log(err)
    );

// Middleware
app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/subjects', subjectRouter);
app.use('/tasks', taskRouter);



app.listen(PORT, () => console.log("server is running on PORT" + PORT));
