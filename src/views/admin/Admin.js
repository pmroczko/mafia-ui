import { useState } from "react";
import AdminMenuOptions from "../../enums/AdminMenuOptions";
import AdminMenu from "./AdminMenu";
import Footer from "../../components/Footer";
import ScenarioEditor from "./ScenarioEditor";

function Admin() {
  const [adminSubPage, setAdminSubPage] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const onMenuSelected = (menuOption) => {
    console.log(`Selected ${menuOption} subpage`);
    setAdminSubPage(menuOption);
  };

  const renderSubPages = () => {
    switch (adminSubPage) {
      case AdminMenuOptions.ScenarioEditor:
        return <ScenarioEditor onSelected={setSelectedScenario} setAdminSubPage={setAdminSubPage} />
      default:
        return <AdminMenu onMenuSelected={onMenuSelected} selectedScenario={selectedScenario} />;
    }
  };


  return <div>
    {renderSubPages()}
  </div>
}


export default Admin;
