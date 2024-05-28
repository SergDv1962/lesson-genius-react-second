import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./pages/home/Home";
// import About from "./pages/about/About";
// import AppTodo from "./pages/appTodo/AppTodo";
// import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import Layout from "./layout/Layout";
// import AddTodo from "./pages/appTodo/components/AddTodo";
// import EditTodo from "./pages/appTodo/components/EditTodo";
import { Suspense, lazy, useState } from "react";
import Loader from "../../loaders/Loader";

import "./Todo46.css"
import PageError from "./pages/page-error/PageError";
import Login from "./pages/login/Login";
import PrivateRoutes from "./pages/appTodo/components/PrivateRoutes";
import { useQuery } from "react-query";
import { getAllUsers } from "./pages/appTodo/api/Api";
import Registration from "./registration/Registration";

const Home = lazy(()=>import("./pages/home/Home"))
const About = lazy(()=>import("./pages/about/About"))
const AppTodo = lazy(()=>import("./pages/appTodo/AppTodo"))
const AddTodo = lazy(()=>import("./pages/appTodo/components/AddTodo"))
const EditTodo = lazy(()=>import("./pages/appTodo/components/EditTodo"))
const NotFoundPage = lazy(()=>import("./pages/notfoundpage/NotFoundPage"))

const Todo46 = () => {
   const navigate = useNavigate();
   const [erPage, setErPage] = useState('');
   const [loginUser, setLoginUser] = useState({username: null, email: null})
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const { data:users } = useQuery({
      queryKey: ['userList'],
      queryFn: getAllUsers,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: ()=>{
         console.log(users);
         if (!!users?.find(el=>el.email===loginUser.email)){
            setIsAuthenticated(true);
            alert('Ви можете користуватись застосунком');
            navigate('/')
         }  
      }
   })
   console.log(loginUser);

   return ( 
       <div className="wrapper">
         <Suspense fallback={<Loader/>}>
            <Routes>
               <Route path="/" element={<Layout/>}>
                  <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/>
                  <Route index element={<Home/>}/>
                  <Route path="/about" element={
                     <PrivateRoutes isAuthenticated={isAuthenticated}>
                        <About/>
                     </PrivateRoutes>}/>
                  <Route path="/apptodo" element={
                     <PrivateRoutes isAuthenticated={isAuthenticated}>
                        <AppTodo setErPage={setErPage}/>
                     </PrivateRoutes>
                  }/>
                  <Route path="/apptodo/addtodo" element={
                     <PrivateRoutes isAuthenticated={isAuthenticated}>
                        <AddTodo/>
                     </PrivateRoutes>
                  }/>
                  <Route path="/apptodo/:editTodoId" element={
                     <PrivateRoutes isAuthenticated={isAuthenticated}>
                        <EditTodo/>
                     </PrivateRoutes>
                  }/>
                  <Route path="/registration" element={<Registration/>}/>
                  <Route path="/error-page" element={<PageError erPage={erPage}/>}/>
                  <Route path="/404page" element={<NotFoundPage/>}/>
                  <Route path="*" element={<Navigate to={'/404page'}/>}/>
               </Route>
          </Routes>
         </Suspense>
       </div>
    );
}
 
export default Todo46;