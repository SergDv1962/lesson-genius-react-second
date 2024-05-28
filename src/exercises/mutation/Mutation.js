// import {Todos} from "./todos/Todos";

import { Route, Routes } from "react-router-dom";
import {Todo} from './todos2/Todo';
import {Todos} from './todos2/Todos';
import './todos2/mocks';

const Mutation = () => {
   return ( 
      <>
         {/* <Todos/> */}
         <Routes>
            <Route path={'/todo/:id'} element={<Todo/>}/>
            <Route path={'/'} element={<Todos/>}/>
         </Routes>
      </>
    );
}
 
export default Mutation;