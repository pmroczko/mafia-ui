import HamburgerButton from "./buttons/HamburgerButton";

function Header(props) {
  return (
    <div className='header-container'>
      <HamburgerButton />
      <div className='header-text-container'>
        <h1 className='header'>{props.text}</h1>
      </div>
    </div>
  );
}

export default Header;
