import { Button } from "react-bootstrap";
import MafiaButton from "../../components/buttons/MafiaButton";
import Header from "../../components/Header";
import ButtonClasses from "../../enums/ButtonClasses";

const AdminUserList = ({ onMenuSelected }) => {
  return (
    <div>
      <Header text='Manage Players' />
      <Button
        className={ButtonClasses.Footer}
        onClick={() => onMenuSelected(null)}
      >
        Go back
      </Button>
    </div>
  );
};

export default AdminUserList;
