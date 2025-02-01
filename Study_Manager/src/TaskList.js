import { useState } from "react";
import "./TaskList.css";

function TaskList({ tasks, completeTask, isMainView }) {
  const [isCompleting, setIsCompleting] = useState(null);
  const [completionRating, setCompletionRating] = useState(1);

  const handleComplete = (index) => {
    setIsCompleting(index);
  };

  const handleCompletion = (index) => {
    completeTask(index, completionRating);
    setIsCompleting(null);
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="task-list-container">
      <h3>タスク一覧</h3>
      <div className="task-list">
        <ul>
          {incompleteTasks.map((task, index) => (
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
                    <button onClick={() => handleCompletion(index)}>完了</button>
                  </>
                ) : (
                  <>
                    <span>{task.subjectName}: {task.description} (優先度: {task.priority})</span>
                    <button onClick={() => handleComplete(index)}>完了</button>
                  </>
                )
              ) : (
                <>
                  <span>{task.subjectName}: {task.description} (優先度: {task.priority})</span>
                </>
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
