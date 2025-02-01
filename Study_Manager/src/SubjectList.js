import React, { useState , useEffect } from "react";
import TaskForm from "./TaskForm";



function SubjectList({ subjects, addTask, editSubject, deleteSubject }) {
  const [isEditing, setIsEditing] = useState(null);
  const [editedSubject, setEditedSubject] = useState({ name: "", testDate: "" });

  useEffect(() => {
    console.log("Updated subjects:", subjects);
  }, [subjects]);
  
  
  console.log("Subjects in SubjectList:", subjects); // デバッグ用

  if (!subjects || subjects.length === 0) {
    return <p>Loading subjects...</p>; // subjects が空なら表示
  }

  // 編集モードにする
  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedSubject(subjects[index] || { name: "", testDate: "" });
  };

  // 編集内容を保存
  const handleSaveClick = (index) => {
    if (!editedSubject.name || !editedSubject.testDate) {
      alert("すべての項目を入力してください");
      return;
    }

    if (editSubject) {
      editSubject(subjects[index]._id, editedSubject);
    }

    setIsEditing(null);
  };

  return (
    <div>
      <h2>登録された教科</h2>
      <ul>
        {subjects.map((subject, index) => (
          <li key={subject._id}>
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
                {subject.name} - {new Date(subject.testDate).toLocaleDateString()}
                <button onClick={() => handleEditClick(index)}>編集</button>
                <button onClick={() => deleteSubject(subject._id)}>削除</button>
              </div>
            )}
            {/* `subject._id` を `TaskForm` に正しく渡す */}
            {subject._id ? (
              <TaskForm addTask={(task) => addTask(subject._id, task)} subjectId={subject._id} />
            ) : (
              <p>Loading TaskForm...</p>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubjectList;
