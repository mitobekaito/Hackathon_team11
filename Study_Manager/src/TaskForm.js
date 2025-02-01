import { useState, useEffect } from "react";

function TaskForm({ addTask, subjectId }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    console.log("TaskForm subjectId:", subjectId); // デバッグ用
  }, [subjectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    if (!subjectId) {
      console.error("Error: subjectId is undefined");
      return;
    }
    addTask(subjectId, { description, priority });
    setDescription("");
    setPriority(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="タスク内容"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(Number(e.target.value))}>
        <option value={1}>優先度 1</option>
        <option value={2}>優先度 2</option>
        <option value={3}>優先度 3</option>
      </select>
      <button type="submit" className="btn btn-primary task-submit-button">追加</button>
    </form>
  );
}

function SubjectForm({ addSubject }) {
  const [name, setName] = useState("");
  const [testDate, setTestDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !testDate) return;
    const formattedDate = new Date(testDate).toISOString(); // 日付をISO 8601形式に変換
    addSubject({ name, testDate: formattedDate });
    setName("");
    setTestDate("");
  };

  return (
    <div>
      <h2>教科を登録</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="教科名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary task-submit-button">追加</button>
      </form>
    </div>
  );
}

export default SubjectForm;
export { TaskForm };