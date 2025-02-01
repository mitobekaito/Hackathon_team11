//カレンダーコンポーネント

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // カレンダーのcss
import "./CalendarMenu.css";

const CalendarMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="hamburger-button-right" onClick={toggleMenu}>
                &#9776;
            </button>
            <div className={`menu-right ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>
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