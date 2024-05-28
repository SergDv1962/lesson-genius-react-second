import { Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Contacts from "./pages/contacts/Contacts";
import Home from "./pages/home/Home";
import NotFindPage from "./pages/notfindpage/NotFindPage";
import Layout from "./layout/Layout";
import './routerOne.css'
import InfoContact from "./pages/contacts/InfoContact";

const RouterOne = () => {
   return ( 
      <>
         <Routes>
            <Route path='/' element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route path='/about' element={<About/>}/>
               <Route path='/contacts' element={<Contacts/>}/>
               <Route path='/contacts/:id' element={<InfoContact/>}/>
               <Route path='*' element={<NotFindPage/>}/>
            </Route>
         </Routes>
         RouterOne
      </>
    );
}
 
export default RouterOne;