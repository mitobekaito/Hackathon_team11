import SubjectList from "./SubjectList";

function Level({ subjects, addTask }) {
    const totalXP = subjects.reduce((acc, subject) => acc + subject.XP, 0);
    const level = Math.floor(totalXP / xpPerLevel) + 1;

    return (
        <div>
            <h1>レベル {level}</h1>
            <SubjectList subjects={subjects} addTask={addTask} />
        </div>
    );
}