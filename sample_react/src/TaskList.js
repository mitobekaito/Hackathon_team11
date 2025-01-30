import { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({ description: "", priority: 1 });

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  };

  const handleUpdate = (index) => {
    updateTask(index, editedTask);
    setIsEditing(null);
  };

  return (
    <div className="task-list-container">
      <h3>タスク一覧</h3>
      <div className="task-list">
        <ul>
          {tasks.slice(0, 5).map((task, index) => (
            <li key={index}>
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
                  {task.subjectName}: {task.description} (優先度: {task.priority})
                  <button onClick={() => handleEdit(index)}>編集</button>
                  <button onClick={() => deleteTask(index)}>削除</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;