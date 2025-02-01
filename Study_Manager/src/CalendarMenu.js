import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarMenu.css";

const CalendarMenu = ({ subjects }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    //カレンダーの日付に科目名を表示するreact-calendarの関数
    const tileContent = ({ date, view }) => {
        if (view === 'month' && Array.isArray(subjects)) { // subjectsが配列かどうかをチェック
            const subjectsForTheDay = subjects.filter(subject =>
                new Date(subject.date).toDateString() === date.toDateString()
            ).slice(0, 4); // 最大4つの教科を取得
            return (
                <div className="subjects">
                    {subjectsForTheDay.map((subject, index) => (
                        <div key={index} className="subject">{subject.name}</div>
                    ))}
                </div>
            );
        }
        return null; // subjectsがない場合は何も表示しない
    };

    return (
        <div>
            <button className="hamburger-button-right" onClick={toggleMenu}>
                &#9776;
            </button>
            <div className={`menu-right ${isOpen ? "open-menu-right" : ""}`}>
                <button className="close-button-right" onClick={toggleMenu}>
                    &times;
                </button>
                <div className="menu-content-right">
                    <h3>カレンダー</h3>
                    <Calendar value={value} onClickDay={(e) => setValue(e)} tileContent={tileContent} />
                    <div>{value ? value.toString() : "日付を選択してください"}</div>
                </div>
            </div>
        </div>
    );
};

export default CalendarMenu;