import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios"; // API通信に必要
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList";
import CalendarMenu from "./CalendarMenu"; 
import LevelDisplay from "./LevelDisplay";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [xp, setXP] = useState({});
  const [showAll, setShowAll] = useState(false); // ボタンで表示を切り替える

  //サーバーから科目を取得
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/subjects");
      setSubjects(res.data);//取得したデータを更新

      // 各教科の初期XPを 0 に設定
      const initialXp = res.data.reduce((acc, subject) => {
        acc[subject._id] = subject.XP || 0;
        return acc;
      }, {});
      setXP(initialXp);
    } catch (err) {
      console.error("科目の取得に失敗：", err);
    }
  };

  //サーバーからすべてのタスクを取得
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
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
  const addSubject = async (subject) => {
    try {
      console.log("追加する科目：", subject);//デバック用

      const res = await axios.post("http://localhost:5000/subjects", {
        name: subject.name,
        date: subject.date || new Date().toISOString().split('T')[0] //日付がない場合は現在の日付を取得
      });
      setSubjects([...subjects, res.data]);//取得したデータを更新
    } catch (err) {
      console.error("科目の追加に失敗：", err.response?.data || err);//エラーがあればエラーメッセージを返す
    }
  };

  //タスクの追加
  const addTask = async (subjectIndex, task) => {
    try {
      const newTask = { ...task, subjectId: subjects[subjectIndex]._id };//科目IDを関連付ける
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      setTasks([...tasks, res.data]);//取得したデータを更新
    } catch (err) {
      console.error("タスクの追加に失敗：", err);
    }
  };

  //タスクの更新
  const updateTask = async (taskIndex, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${tasks[taskIndex]._id}`, updatedTask);
      const newTasks = [...tasks];
      newTasks[taskIndex] = updatedTask;//更新したデータを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの更新に失敗：", err);
    }
  };

  //タスクの削除
  const deleteTask = async (taskIndex) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${tasks[taskIndex]._id}`);
      const newTasks = [...tasks];
      newTasks.splice(taskIndex, 1);//削除したタスクを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの削除に失敗：", err);
    }
  };

  //タスクの完了
  const completeTask = async (taskIndex, rating) => {
    try {
        const task = tasks[taskIndex];

        const xpIncrement = task.understanding*task.priority*4;

        const updatedTask = { ...tasks[taskIndex], completed: true, rating };
        await axios.put(`http://localhost:5000/tasks/${tasks[taskIndex]._id}`, updatedTask);

        //XPを更新
        const subjectId = tasks[taskIndex].subjectId;
        if (subjectId) {
          await axios.put(`http://localhost:5000/subjects/${subjectId}/increase-xp`, {
            increment: xpIncrement //XPを増加
          });

          //フロント側でもXP更新
          setXP((prevXP) =>({
            ...prevXP,
            [subjectId]: (prevXP[subjectId] || 0) + xpIncrement
          }));
        }
        const newTasks = [...tasks];
        newTasks[taskIndex] = updatedTask;//完了したタスクを取得
        setTasks(newTasks);//取得したデータを更新
    } catch (err) {
        console.error("タスクの完了に失敗：", err);
    }
  };

  console.log("Subjects:", subjects);
  console.log("XP:", xp);

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
        <CalendarMenu />

        {/* レベル表示（横スクロール対応） */}
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {(showAll ? subjects : subjects.slice(0, 3)).map((subject) => (
              <div key={subject._id} className="min-w-[16rem] flex-shrink-0">
                <LevelDisplay initialXp={xp[subject._id] || 0} subjectName={subject.name} />
              </div>
            ))}
          </div>

        {/* もっと見る/隠す ボタン */}
        {subjects.length > 3 && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setShowAll(!showAll)} 
              className="btn btn-primary">
              {showAll ? "隠す" : "もっと見る"}
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/task-completion"
            element={<TaskCompletion tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />}
          />
          <Route path="/" element={<TaskList tasks={tasks} completeTask={completeTask} isMainView={true} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;