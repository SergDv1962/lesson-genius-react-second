import { Link, NavLink, Outlet } from "react-router-dom";
import Loader from "../../../../loaders/Loader";
const getActiveLink = ({ isActive }) => (isActive ? "active-green" : "");

const Layout = ({isFetching, isAuthenticated, setIsAuthenticated}) => {

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
