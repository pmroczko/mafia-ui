import { Link } from "react-router-dom";
const MenuLink = ({ route, text, location }) => {
  return (
    <div>
      <Link
        to={"/" + route}
        className={
          "menu-link-container" +
          (location === route ? " menu-link-selected" : "")
        }
      >
        {text}
      </Link>
      <br />
    </div>
  );
};
export default MenuLink;
