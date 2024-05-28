import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContent";
import "./Layout.css";

const Layout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <>
      <header className="header">
        <NavLink to={"/"}>Home</NavLink>
        {isAuthenticated && (
          <>
            <NavLink to={"/about"}>About</NavLink>
            <NavLink to={"/apptodo"}>AppTodo</NavLink>
            <Link
               to='/login'
               onClick={()=>{
                  setIsAuthenticated(false);
                  localStorage.removeItem('email');
               }}
            >Log Out</Link>
          </>
        )}
        {!isAuthenticated && 
            <NavLink to='/login'>
               Login
            </NavLink>}
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer>
        <span>All rights reserved. 2024</span>
      </footer>
    </>
  );
};

export default Layout;
