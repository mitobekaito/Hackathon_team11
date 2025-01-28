import { useState } from "react";

function SubjectList({ subjects }) {
    return (
      <div>
        <h2>登録された教科</h2>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject.name} - {new Date(subject.testDate).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SubjectList;