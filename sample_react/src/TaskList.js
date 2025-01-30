import { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, updateTask, deleteTask, completeTask, isMainView }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({ description: "", priority: 1 });
  const [isCompleting, setIsCompleting] = useState(null);
  const [completionRating, setCompletionRating] = useState(1);

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  };

  const handleUpdate = (index) => {
    updateTask(index, editedTask);
    setIsEditing(null);
  };

  const handleComplete = (index) => {
    setIsCompleting(index);
  };

  const handleCompletion = (index) => {
    completeTask(index, completionRating);
    setIsCompleting(null);
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const getTopPriorityTasks = (tasks) => {
    const taskMap = tasks.reduce((map, task) => {
      if (!map[task.subjectName]) {
        map[task.subjectName] = [];
      }
      map[task.subjectName].push(task);
      return map;
    }, {});

    const topTasks = [];
    for (const subject in taskMap) {
      const sortedTasks = taskMap[subject].sort((a, b) => b.priority - a.priority);
      topTasks.push(...sortedTasks.slice(0, 3));
    }
    return topTasks;
  };

  const displayTasks = isMainView ? getTopPriorityTasks(incompleteTasks) : incompleteTasks;

  return (
    <div className="task-list-container">
      <h3>タスク一覧</h3>
      <div className="task-list">
        <ul>
          {displayTasks.map((task, index) => (
            <li key={index}>
              {isMainView ? (
                isCompleting === index ? (
                  <>
                    <span>{task.subjectName}: {task.description} (優先度: {task.priority})</span>
                    <select
                      value={completionRating}
                      onChange={(e) => setCompletionRating(e.target.value)}
                    >
                      <option value={1}>理解度 1</option>
                      <option value={2}>理解度 2</option>
                      <option value={3}>理解度 3</option>
                      <option value={4}>理解度 4</option>
                      <option value={5}>理解度 5</option>
                    </select>
                    <button onClick={() => handleCompletion(index)}>確認</button>
                  </>
                ) : (
                  <>
                    <span>{task.subjectName}: {task.description} (優先度: {task.priority})</span>
                    <button onClick={() => handleComplete(index)}>完了</button>
                  </>
                )
              ) : (
                isEditing === index ? (
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
                    <span>{task.subjectName}: {task.description} (優先度: {task.priority})</span>
                    <button onClick={() => handleEdit(index)}>編集</button>
                    <button onClick={() => deleteTask(index)}>削除</button>
                  </>
                )
              )}
            </li>
          ))}
        </ul>
      </div>
      {isMainView && (
        <>
          <h3>完了済みタスク</h3>
          <div className="task-list completed-tasks">
            <ul>
              {completedTasks.map((task, index) => (
                <li key={index}>
                  <span>{task.subjectName}: {task.description} (優先度: {task.priority}) - 理解度: {task.rating}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskList;