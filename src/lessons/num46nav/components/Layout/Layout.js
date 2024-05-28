import { NavLink, Outlet } from "react-router-dom";
const getActiveLink = ({ isActive }) => (isActive ? "active-green" : "");

const Layout = () => {
  return (
    <>
      <header className="App-header">
        <NavLink to="/">Home</NavLink>
        <NavLink
          to="/contact"
          style={({ isActive }) => ({ color: isActive ? "yellow" : "" })}
        >
          Contact
        </NavLink>
        <NavLink to="/about" className={getActiveLink}>
          About
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>All rights ... 2024</footer>
    </>
  );
};

export default Layout;
