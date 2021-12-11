import HamburgerButton from "./buttons/HamburgerButton";
import Menu from "../components/Menu";
import { useState } from "react";

function Header({ text, subText, onMenuShown, onMenuHidden }) {
  const [menuShown, setMenuShown] = useState(false);
  const toggleMenu = () => {
    setMenuShown(!menuShown);
    if (menuShown) {
      onMenuShown && onMenuShown();
    } else {
      onMenuHidden && onMenuHidden();
    }
  };

  subText = subText ? ` ${subText}` : "";
  return (
    <div className='header-container'>
      <HamburgerButton onClicked={toggleMenu} />
      {menuShown && <Menu onClicked={toggleMenu} />}
      <div className='header-text-container'>
        <span className='header'>{text}</span>
      </div>
    </div>
  );
}

export default Header;
