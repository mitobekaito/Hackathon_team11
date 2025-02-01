import { useState } from "react";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import "./HamburgerMenu.css";

function HamburgerMenu({ children, subjects = [], setSubjects, tasks = [], setTasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({ description: "", priority: 1 });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  const addTask = (subjectIndex, task) => {
    const newTask = { ...task, subjectName: subjects[subjectIndex].name };
    setTasks([...tasks, newTask]);
  };

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  };

  const handleUpdate = (index) => {
    const newTasks = [...tasks];
    newTasks[index] = editedTask;
    setTasks(newTasks);
    setIsEditing(null);
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div>
      <button className="hamburger-button" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <div className="menu-content">
          <SubjectForm addSubject={addSubject} />
          <SubjectList subjects={subjects} addTask={addTask} />
          <h3>タスク一覧</h3>
          <div className="task-list">
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className="task-item">
                  {isEditing === index ? (
                    <>
                      <input
                        type="text"
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      />
                      <select
                        value={editedTask.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                      >
                        <option value={1}>優先度 1</option>
                        <option value={2}>優先度 2</option>
                        <option value={3}>優先度 3</option>
                      </select>
                      <button onClick={() => handleUpdate(index)}>更新</button>
                    </>
                  ) : (
                    <>
                      <span className="task-name">{task.description}</span>
                      <span className="task-priority">優先度: {task.priority}</span>
                      <button onClick={() => handleEdit(index)}>編集</button>
                      <button onClick={() => handleDelete(index)}>削除</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;