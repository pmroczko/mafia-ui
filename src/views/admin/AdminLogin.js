import { useRef, useEffect } from "react";
import CacheController from "../../controllers/CacheController";
import AuthController from "../../controllers/AuthController";
import Header from "../../components/Header";
import MafiaInput from "../../components/Input";
import { Button } from "react-bootstrap";
import ButtonClasses from "../../enums/ButtonClasses";

const AdminLogin = ({ onAuthenticated }) => {
  const adminPassRef = useRef();

  useEffect(() => {
    async function updateRef() {
      if (adminPassRef.current && CacheController.IsAdminPasswordSet()) {
        adminPassRef.current.value = CacheController.GetAdminPassword();
      }
    }
    updateRef();
  }, []);

  const onClicked = () => {
    const is =
      adminPassRef &&
      adminPassRef.current &&
      AuthController.Authenticate(adminPassRef.current.value);
    if (is) {
      onAuthenticated();
      CacheController.SetAdminPassword(adminPassRef.current.value);
    }
  };
  return (
    <div className='mafia-container'>
      <Header text='Provide Admin Password' />
      <MafiaInput referenceField={adminPassRef} customType='password' />
      <Button onClick={onClicked} className={ButtonClasses.Big}>
        Submit
      </Button>
    </div>
  );
};

export default AdminLogin;
