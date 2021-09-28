import { Link } from "react-router-dom";
const MenuLink = ({ route, text, location, onClicked }) => {
  onClicked = onClicked ? onClicked : () => {};
  return (
    <div>
      <Link
        to={"/" + route}
        className={
          "menu-link-container" +
          (location === route ? " menu-link-selected" : "")
        }
        onClick={onClicked}
      >
        {text}
      </Link>
      <br />
    </div>
  );
};
export default MenuLink;
