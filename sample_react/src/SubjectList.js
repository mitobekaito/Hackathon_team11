import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function SubjectList({ subjects }) {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div>
      <h2>登録された教科</h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={index}>
            {subject.name} - {new Date(subject.testDate).toLocaleString()}
            <TaskForm addTask={(task) => addTask(index, task)} />
          </li>
        ))}
      </ul>
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default SubjectList;