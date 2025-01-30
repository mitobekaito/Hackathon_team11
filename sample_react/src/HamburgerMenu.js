import { useState } from "react";
import "./HamburgerMenu.css";

function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        {children}
      </div>
    </div>
  );
}

export default HamburgerMenu;