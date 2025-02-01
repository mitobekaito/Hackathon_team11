<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> mitobekaito
import TaskForm from "./TaskForm";

function SubjectList({ subjects, addTask }) {
  // 日付が近い順にソート
  const sortedSubjects = [...subjects].sort((a, b) => new Date(a.testDate) - new Date(b.testDate));

  return (
    <div>
      <h2>登録された教科</h2>
      <ul>
        {sortedSubjects.map((subject, index) => (
          <li key={index}>
            {subject.name} - {new Date(subject.testDate).toLocaleString()}
            <TaskForm addTask={(task) => addTask(index, task)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;