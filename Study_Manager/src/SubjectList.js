import { useState } from "react";
import TaskForm from "./TaskForm";

function SubjectList({ subjects, addTask, editSubject, deleteSubject }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedSubject, setEditedSubject] = useState({ name: "", date: "" });

  // 日付が近い順にソート
  const sortedSubjects = [...subjects].sort((a, b) => new Date(a.date) - new Date(b.date));

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
          <li key={index} className="subject-item">
            {isEditing === index ? (
              <div>
                <input
                  type="text"
                  value={editedSubject.name}
                  onChange={(e) => setEditedSubject({ ...editedSubject, name: e.target.value })}
                />
                <input
                  type="datetime-local"
                  value={new Date(editedSubject.date).toISOString().slice(0, 16)}
                  onChange={(e) => setEditedSubject({ ...editedSubject, date: e.target.value })}
                />
                <button onClick={() => handleSaveClick(index)}>保存</button>
              </div>
            ) : (
              <div>
                {subject.name} - {new Date(subject.date).toLocaleString()}
                <button onClick={() => handleEditClick(index)}>編集</button>
                <button onClick={() => deleteSubject(subject._id)}>削除</button>
              </div>
            )}
            <TaskForm addTask={addTask} subjectIndex={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;