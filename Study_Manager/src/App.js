import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios"; // API通信に必要
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  //サーバーから科目を取得
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/subjects");
      setSubjects(res.data);//取得したデータを更新
    } catch (err) {
      console.error("科目の取得に失敗：", err);
    }
  };

  //サーバーからすべてのタスクを取得
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks");
      setTasks(res.data);//取得したデータを更新
    } catch (err) {
      console.error("タスクの取得に失敗：", err);
    }
  };

  //初回レンダリング時に科目とタスクを取得
  useEffect(() => {
    fetchSubjects();
    fetchTasks();
  }, []);

  //科目の追加
  const addSubject = async(subject) => {
    try {
      const res = await axios.post("http://localhost:3000/subjects", subject);
      setSubjects([...subjects, res.data]);
    } catch (err) {
      console.error("科目の追加に失敗：", err);
    }
  };

  //タスクの追加
  const addTask = async (subjectIndex, task) => {
    try {
      const newTask = {...tasks, subjectId: subjects[subjectIndex]._id};//科目IDを関連付ける
      const res = await axios.post("http://localhost:3000/tasks", newTask);
      setTasks([...tasks, res.data]);//取得したデータを更新
    } catch (err) {
      console.error("タスクの追加に失敗：", err);
    }
  };

  //タスクの更新
  const updateTask = async(taskIndex, updatedTask) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${tasks[taskIndex]._id}`, updatedTask);
      const newTasks = [...tasks];
      newTasks[taskIndex] = updateTask;//更新したデータを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの更新に失敗：", err);
  }
};

  //タスクの削除
  const deleteTask = async (taskIndex) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${tasks[taskIndex]._id}`);
      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);//削除したタスクを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの削除に失敗：", err);
    }
  };

  //タスクの完了
  const completeTask = async(taskIndex, rating) => {
    try{
      const updatedTask = { ...tasks[taskIndex], completed: true, rating };
      await axios.put(`http://localhost:3000/tasks/${tasks[taskIndex]._id}`, updatedTask);
      const newTasks = [...tasks];
      newTasks[taskIndex] = updatedTask;//完了したタスクを取得
      setTasks(newTasks);//取得したデータを更新
    }catch(err){
      console.error("タスクの完了に失敗：", err);
    }
  };

  return (
    <Router>
      <div className="App">
        <HamburgerMenu />
          <h2>勉強時間管理アプリ</h2>
          <SubjectForm addSubject={addSubject} />
          <SubjectList subjects={subjects} addTask={addTask} />
          <TaskList 
            tasks={tasks} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
            completeTask={completeTask} 
            isMainView={false}
          />
          <Link to="/task-completion">タスク消化画面へ</Link>
        <Routes>
        <Route
          path="/task-completion"
          element={<TaskCompletion tasks={tasks} updateTask={updateTask} deleteTask={deleteTask}/>}
        />
          <Route path="/" element={<TaskList tasks={tasks} completeTask={completeTask} isMainView={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;