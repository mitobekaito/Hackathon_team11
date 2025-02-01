import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const completeTask = (taskIndex, rating) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...newTasks[taskIndex], completed: true, rating };
    setTasks(newTasks);
  };

  return (
    <Router>
      <div>
        <HamburgerMenu subjects={subjects} setSubjects={setSubjects} tasks={tasks} setTasks={setTasks}>
          <h2>勉強時間管理アプリ</h2>
          <Link to="/task-completion">タスク消化画面へ</Link>
        </HamburgerMenu>
        <Routes>
          <Route path="/task-completion" element={<TaskCompletion tasks={tasks} />} />
          <Route path="/" element={<TaskList tasks={tasks} completeTask={completeTask} isMainView={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;