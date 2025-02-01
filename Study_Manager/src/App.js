import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const addTask = (subjectIndex, task) => {
    const newTask = { ...task, subjectName: subjects[subjectIndex].name };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskIndex, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (taskIndex) => {
    const newTasks = [...tasks];
    newTasks.splice(taskIndex, 1);
    setTasks(newTasks);
  };

  const completeTask = (taskIndex, rating) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: true, rating };
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="App">
        <HamburgerMenu>
          <h2>勉強時間管理アプリ</h2>
          <Link to="/task-completion">タスク消化画面へ</Link>
        </HamburgerMenu>
        <Routes>
          <Route path="/task-completion" element={<TaskCompletion tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />} />
          <Route path="/" element={<TaskList tasks={tasks} completeTask={completeTask} isMainView={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;