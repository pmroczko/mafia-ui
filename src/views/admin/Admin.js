import { useState } from "react";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";
import AdminUserList from "./AdminUserList";
import Footer from "../../components/Footer";
import ScenarioEditor from "./ScenarioEditor";
import DataController from "../../controllers/DataController";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(DataController.IsDebug);
  const [adminSubPage, setAdminSubPage] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const onAuthenticated = () => {
    setIsAuthenticated(true);
    setAdminSubPage(null);
  };

  const onMenuSelected = (menuOption) => {
    console.log(`Selected ${menuOption} subpage`);
    setAdminSubPage(menuOption);
  };

  const renderSubPages = () => {
    switch (adminSubPage) {
      case AdminMenuOptions.PlayerList:
        return <AdminUserList onMenuSelected={onMenuSelected} />;
      case AdminMenuOptions.ScenarioEditor:
        return <ScenarioEditor onSelected={setSelectedScenario} />
      default:
        return <AdminMenu onMenuSelected={onMenuSelected} selectedScenario={selectedScenario} />;
    }
  };

  const footerButtons = [
    {
      text: "Back",
      callback: () => { setAdminSubPage(null); }
    }
  ]

  return <div>{isAuthenticated ? (
    renderSubPages()
  ) : (
    <AdminLogin onAuthenticated={onAuthenticated} />
  )}
    {adminSubPage != null && <Footer buttons={footerButtons} />}</div>
}

export default Admin;
