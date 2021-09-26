import { useLocation } from "react-router-dom";
import MenuLink from "./buttons/MenuLink";

function Menu() {
  var location = useLocation();
  location = location.pathname.substring(1);
  return (
    <div className='menu-container'>
      <h1>Menu</h1>
      <MenuLink route='newPlayer' text='JoinGame' location={location} />
      <MenuLink route='lobby' text='Lobby' location={location} />
      <MenuLink route='game' text='Game' location={location} />
      <MenuLink route='admin' text='Admin' location={location} />
    </div>
  );
}

export default Menu;
