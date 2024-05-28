import "./todoRouterOne.css";
import TodoApp from "./pages/todoApp/TodoApp";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Layout from "./layouts/Layout";
import EditTodo from "./components/EditTodo";
import AddTodo from "./components/AddTodo";

const TodoRouterOne = () => {
  return (
    <div className="block-wrapper">
      <Routes>
        <Route paht='/' element={<Layout/>}>
          <Route path={'/todos'} element={<TodoApp/>}/>
          <Route path={'/todos/:paramId'} element={<EditTodo/>}/>
          <Route path={'/todos/addtodo'} element={<AddTodo/>}/>
          <Route index element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Route>
        
      </Routes>
      
    </div>
  );
};

export default TodoRouterOne;
