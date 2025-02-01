import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのcss
import "./CalendarMenu.css";

const CalendarMenu = ({ subjects }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const tileContent = ({ date, view }) => { // tileContent関数を追加
        if (view === 'month') {
            const subject = subjects.find(subject =>
                new Date(subject.date).toDateString() === date.toDateString()
            );
            return subject ? <div className="subject">{subject.name}</div> : null;
        }
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
                    <Calendar value={value} onClickDay={(e) => setValue(e)} />
                    <div>{value ? value.toString() : "日付を選択してください"}</div>
                </div>
            </div>
        </div>
    );
};

export default CalendarMenu;