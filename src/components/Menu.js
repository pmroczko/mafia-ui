import { Link } from "react-router-dom";
function Menu() {
  return (
    <div className='menu-container'>
      <Link to='/newPlayer'>New Player</Link>
      <br />
      <Link to='/lobby'>Lobby</Link>
    </div>
  );
}

export default Menu;
