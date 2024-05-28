import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import AppTodo from "./pages/appTodo/AppTodo";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import Layout from "./layout/Layout";
import AddTodo from "./pages/appTodo/components/AddTodo";

import "./TodoRouterThree.css"
import EditTodo from "./pages/appTodo/components/EditTodo";

const TodoRouterThree = () => {
   return ( 
       <div className="wrapper">
          <Routes>
            <Route path="/" element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route path="/about" element={<About/>}/>
               <Route path="/apptodo" element={<AppTodo/>}/>
               <Route path="/apptodo/addtodo" element={<AddTodo/>}/>
               <Route path="/apptodo/:editTodoId" element={<EditTodo/>}/>
               <Route path="*" element={<NotFoundPage/>}/>
            </Route>
          </Routes>
       </div>
    );
}
 
export default TodoRouterThree;