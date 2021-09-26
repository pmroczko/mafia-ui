import { Link } from "react-router-dom";
function Menu() {
  return (
    <div className='menu-container'>
      <h1>Menu</h1>
      <Link to='/newPlayer'>New Player</Link>
      <br />
      <Link to='/lobby'>Lobby</Link>
      <br />
      <Link to='/player'>Player</Link>
      <br />
      <Link to='/admin'>Admin</Link>
    </div>
  );
}

export default Menu;
