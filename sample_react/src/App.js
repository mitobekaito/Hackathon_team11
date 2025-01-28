import { useState } from "react";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList"; 

function App() {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div>
      <h1>勉強時間管理アプリ</h1>
      <SubjectForm addSubject={addSubject} />
      <SubjectList subjects={subjects} />
    </div>
  );
}

export default App;