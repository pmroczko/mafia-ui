import { useState } from "react";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";
import AdminUserList from "./AdminUserList";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminSubPage, setAdminSubPage] = useState(null);

  const onAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const onMenuSelected = (menuOption) => {
    console.log(`Selected ${menuOption} subpage`);
    setAdminSubPage(menuOption);
  };

  const renderSubPages = () => {
    switch (adminSubPage) {
      case AdminMenuOptions.PlayerList:
        return <AdminUserList onMenuSelected={onMenuSelected} />;
      default:
        return <AdminMenu onMenuSelected={onMenuSelected} />;
    }
  };

  return isAuthenticated ? (
    renderSubPages()
  ) : (
    <AdminLogin onAuthenticated={onAuthenticated} />
  );
}

export default Admin;
