import { useState } from "react";
import TaskForm from "./TaskForm";

function SubjectList({ subjects, addTask, editSubject, deleteSubject }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedSubject, setEditedSubject] = useState({ name: "", testDate: "" });

  // 日付が近い順にソート
  const sortedSubjects = [...subjects].sort((a, b) => new Date(a.testDate) - new Date(b.testDate));

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedSubject(subjects[index]);
  };

  const handleSaveClick = (index) => {
    editSubject(subjects[index]._id, editedSubject);
    setIsEditing(null);
  };

  return (
    <div>
      <h2>登録された教科</h2>
      <ul>
        {sortedSubjects.map((subject, index) => (
          <li key={index}>
            {isEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editedSubject.name}
                  onChange={(e) => setEditedSubject({ ...editedSubject, name: e.target.value })}
                />
                <input
                  type="date"
                  value={editedSubject.testDate}
                  onChange={(e) => setEditedSubject({ ...editedSubject, testDate: e.target.value })}
                />
                <button onClick={() => handleSaveClick(index)}>保存</button>
              </div>
            ) : (
              <div>
                {subject.name} - {new Date(subject.testDate).toLocaleString()}
                <button onClick={() => handleEditClick(index)}>編集</button>
                <button onClick={() => deleteSubject(subject._id)}>削除</button>
              </div>
            )}
            <TaskForm addTask={(task) => addTask(index, task)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;