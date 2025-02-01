import { useState } from "react";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./HamburgerMenu.css";

function HamburgerMenu({ subjects, setSubjects, addSubject, editSubject, deleteSubject, tasks, addTask, updateTask, deleteTask, completeTask }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="hamburger-button" onClick={toggleMenu}>
        {isOpen ? "閉じる" : "メニュー"}
      </button>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>&times;</button>
        <div className="menu-content">
          <SubjectForm addSubject={addSubject} />
          <SubjectList subjects={subjects} addTask={addTask} editSubject={editSubject} deleteSubject={deleteSubject} />
          <TaskForm addTask={addTask} subjectId={subjects.length > 0 ? subjects[0]._id : null} /> {/* タスク入力フォームを追加 */}
          <TaskList
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            completeTask={completeTask}
            isMainView={false}
          />
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;