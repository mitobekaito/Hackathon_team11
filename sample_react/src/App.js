import { useState } from "react";
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import HamburgerMenu from "./HamburgerMenu";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div>
      <HamburgerMenu>
        <h2>勉強時間管理アプリ</h2>
        <SubjectForm addSubject={addSubject} />
        <SubjectList subjects={subjects} />
      </HamburgerMenu>
    </div>
  );
}

export default App;