function Header(props) {
  return (
    <div className='header-container'>
      <h1 className='header'>{props.text}</h1>
    </div>
  );
}

export default Header;
