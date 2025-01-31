import { useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import "./HamburgerMenu.css";

function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <BrowserRouter>
      <div>
        <button className="hamburger-button" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`menu ${isOpen ? "open" : ""}`}>
          <button className="close-button" onClick={toggleMenu}>
            &times;
          </button>
          <div className="menu-content">
            {children}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default HamburgerMenu;