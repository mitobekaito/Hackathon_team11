import { useState } from "react";
import { Link } from 'react-router-dom';
import SubjectForm from "./SubjectForm";
import SubjectList from "./SubjectList";
import "./HamburgerMenu.css";

function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const addSubject = (subject) => {
    setSubjects([...subjects, subject]);
  };

  return (
    <div>
      <button className="hamburger-button" onClick={toggleMenu}>
        &#9776;
      </button>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={toggleMenu}>
          &times;
        </button>
        <div className="menu-content">
          <SubjectForm addSubject={addSubject} />
          <SubjectList subjects={subjects} addTask={() => {}} />
          <nav>
            <ul>
              <li><Link to="/subjects">勉強</Link></li>
              <li><Link to="/add-subject">勉強の追加</Link></li>
              <li><Link to="/tasks">Tasks</Link>タスク</li>
              <li><Link to="/complete-task">タスクの完了</Link></li>
            </ul>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;