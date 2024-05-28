import { Link, NavLink, Outlet } from "react-router-dom";
import Loader from "../../../../loaders/Loader";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContent";
import { useSelector } from "react-redux";
const getActiveLink = ({ isActive }) => (isActive ? "active-green" : "");

const Layout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const isFetching = useSelector(state=>state.users.loading)

  return (
    <div>
      <header className="App-header">
        <NavLink to="/">Home</NavLink>
        {isAuthenticated && (
          <>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({ color: isActive ? "yellow" : "" })}
          >
            Contact
          </NavLink>
          <NavLink to="/about" className={getActiveLink}>
            About
          </NavLink>
          <Link 
            to='/login'
            onClick={()=>{
              setIsAuthenticated(false);
              localStorage.removeItem('email');
            }}
          >
            Log Out
          </Link>
        </>
        )}
        {!isAuthenticated && (
          <NavLink to='/login'>
            Login
          </NavLink>
        )}
      </header>
      <main>
        {isFetching ? <Loader/> : <Outlet />}
      </main>
      <footer>All rights ... 2024</footer>
    </div>
  );
};

export default Layout;
