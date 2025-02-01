import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios"; // API通信に必要
import HamburgerMenu from "./HamburgerMenu";
import TaskCompletion from "./TaskCompletion";
import TaskList from "./TaskList"; // TaskList をインポート
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
      const res = await axios.get("http://localhost:4000/subjects");
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
      const res = await axios.get("http://localhost:4000/tasks");
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

      const res = await axios.post("http://localhost:4000/subjects", {
        name: subject.name,
        date: subject.date || new Date().toISOString().split('T')[0] //日付がない場合は現在の日付を取得
      });
      setSubjects([...subjects, res.data]);//取得したデータを更新
    } catch (err) {
      console.error("科目の追加に失敗：", err.response?.data || err);//エラーがあればエラーメッセージを返す
    }
  };

  //タスクの追加
  const addTask = async (subjectId, task) => {
    try {
      const newTask = { ...task, subjectId };
      console.log("追加するタスク：", newTask); // 追加するタスクをログに出力
      const res = await axios.post("http://localhost:4000/tasks", newTask);
      setTasks([...tasks, res.data]);//取得したデータを更新
    } catch (err) {
      console.error("タスクの追加に失敗：", err.response?.data || err);
    }
  };

  //タスクの更新
  const updateTask = async (taskIndex, updatedTask) => {
    try {
      await axios.put(`http://localhost:4000/tasks/${tasks[taskIndex]._id}`, updatedTask);
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
      await axios.delete(`http://localhost:4000/tasks/${tasks[taskIndex]._id}`);
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
      const updatedTask = { ...tasks[taskIndex], completed: true, rating };
      await axios.put(`http://localhost:4000/tasks/${tasks[taskIndex]._id}`, updatedTask);

      //XPを更新
      const subjectId = tasks[taskIndex].subjectId;
      if (subjectId) {
        await axios.put(`http://localhost:4000/subjects/${subjectId}/increase-xp`, {
          increment: 100 //XPを100増加
        });

        //フロント側でもXP更新
        setSubjects(subjects.map((subject) =>
          //XPを更新した科目のみXPを増加
          subject._id === subjectId ? { ...subject, XP: subject.XP + 100 } : subject
        ));
      }

      const newTasks = [...tasks];
      newTasks[taskIndex] = updatedTask;//完了したタスクを取得
      setTasks(newTasks);//取得したデータを更新
    } catch (err) {
      console.error("タスクの完了に失敗：", err);
    }
  };

  //科目の編集
  const editSubject = async (subjectId, updatedSubject) => {
    try {
      await axios.put(`http://localhost:4000/subjects/${subjectId}`, updatedSubject);
      const newSubjects = subjects.map(subject =>
        subject._id === subjectId ? { ...subject, ...updatedSubject } : subject
      );
      setSubjects(newSubjects);
    } catch (err) {
      console.error("科目の編集に失敗：", err);
    }
  };

  //科目の削除
  const deleteSubject = async (subjectId) => {
    try {
      await axios.delete(`http://localhost:4000/subjects/${subjectId}`);
      const newSubjects = subjects.filter(subject => subject._id !== subjectId);
      setSubjects(newSubjects);
    } catch (err) {
      console.error("科目の削除に失敗：", err);
    }
  };

  return (
    <Router>
      <div className="App">
        <HamburgerMenu
          subjects={subjects}
          setSubjects={setSubjects}
          addSubject={addSubject}
          editSubject={editSubject}
          deleteSubject={deleteSubject}
          tasks={tasks}
          addTask={addTask}
          updateTask={updateTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
        <h2 className="app-title">Study Manager</h2>
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          completeTask={completeTask}
          isMainView={true}
        />
        <CalendarMenu />
        {/* レベル表示（横スクロール対応） */}
        <div className="level-display-container flex flex-wrap justify-center gap-4 p-4">
          {(showAll ? subjects : subjects.slice(0, 3)).map((subject) => (
            <div key={subject._id} className="min-w-[16rem] flex-shrink-0">
              <LevelDisplay initialXp={xp[subject._id] || 0} subjectName={subject.name} />
            </div>
          ))}
        </div>

        {/* もっと見る/隠す ボタン */}
        {subjects.length > 3 && (
          <div className="show-more-button-container">
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