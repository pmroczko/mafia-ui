import HamburgerButton from "./buttons/HamburgerButton";
import Menu from "../components/Menu";
import { useState } from "react";

function Header({ text, onMenuShown, onMenuHidden }) {
  const [menuShown, setMenuShown] = useState(false);
  const toggleMenu = () => {
    setMenuShown(!menuShown);
    if (menuShown) {
      onMenuShown && onMenuShown();
    } else {
      onMenuHidden && onMenuHidden();
    }
  };
  return (
    <div className='header-container'>
      <HamburgerButton onClicked={toggleMenu} />
      {menuShown && <Menu />}
      <div className='header-text-container'>
        <h1 className='header'>{text}</h1>
      </div>
    </div>
  );
}

export default Header;
