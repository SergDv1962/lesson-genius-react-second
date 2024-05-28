import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const getActiveStyle = ({ isActive }) => (isActive ? "active-pink" : "");
  return (
    <>
      <header className="header-box">
        <NavLink to="/">Home</NavLink>
        <NavLink className={getActiveStyle} to="/about">
          About
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ color: isActive ? "orange" : ""})}
          to="/contacts"
        >
          Contacts
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer RouterOne</footer>
      Layout
    </>
  );
};

export default Layout;
