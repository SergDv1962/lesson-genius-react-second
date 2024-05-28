import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
   return ( 
      <>
         <header className="header-box">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/todos'>TodoApp</NavLink>
         </header>
         <main>
            <Outlet/>
         </main>
         <footer>All wright ..... 2024</footer>
      </>
    );
}
 
export default Layout;