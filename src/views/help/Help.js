import { useState } from "react";
import HelpMenuOptions from "../../enums/HelpMenuOptions";
import HelpMenu from "./HelpMenu";
import HelpRoles from "./HelpRoles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Help() {
  const [page, setPage] = useState(HelpMenuOptions.Menu);
  const [isVisible, setIsVisible] = useState(true);

  const onMenuSelected = (selectedPage) => {
    setPage(selectedPage);
  };

  const footerButtons = () => {
    if (page === HelpMenuOptions.Menu) return [];
    return [
      {
        text: "back",
        callback: () => setPage(HelpMenuOptions.Menu),
      },
    ];
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const getPage = () => {
    switch (page) {
      case HelpMenuOptions.Menu:
        return <HelpMenu onMenuSelected={onMenuSelected} />;
      case HelpMenuOptions.Roles:
        return <HelpRoles />;
    }
  };

  const getHeaderText = () => {
    if (page === HelpMenuOptions.Menu) return "Help";
    return `Help ${page}`;
  };

  return (
    <div>
      <Header
        text={getHeaderText()}
        onMenuShown={toggleVisibility}
        onMenuHidden={toggleVisibility}
      />
      <div className='mafia-container help-container'>
        {isVisible && getPage()}
      </div>
      <Footer buttons={footerButtons()} />
    </div>
  );
}

export default Help;
