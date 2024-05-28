import { NavLink, Outlet } from "react-router-dom";
import './Layout.css'

const Layout = () => {
   return ( 
      <>
         <header className="header">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/about'}>About</NavLink>
            <NavLink to={'/apptodo'}>AppTodo</NavLink>
         </header>
         <main className="main">
            <Outlet/>
         </main>
         <footer>
            <span>All rights reserved. 2024</span>
         </footer>
      </>
    );
}
 
export default Layout;