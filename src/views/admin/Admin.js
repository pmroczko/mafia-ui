import { useRef, useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminMenu from "./AdminMenu";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const onAuthenticated = () => {
    setIsAuthenticated(true);
  };

  return isAuthenticated ? (
    <AdminMenu />
  ) : (
    <AdminLogin onAuthenticated={onAuthenticated} />
  );
}

export default Admin;
