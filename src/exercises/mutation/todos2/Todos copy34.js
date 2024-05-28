import { useQuery } from "react-query"
import { Link } from "react-router-dom";
import { TodoForm } from "./TodoForm";

export const Todos = () => {
   const {
      data: todos = [],
      isLoading,
      isFetching,
   } = useQuery(['todos'], async () => {
      await new Promise((resolve) => 
         setTimeout(resolve, 200),
      );
      return fetch('api/todos').then((res) =>
      res.json(),
      );
   });
   
   return isLoading ? 'Loading...' : (
      <div>
         <h3>
            Мій лист справ{isFetching ? '...' : null}
         </h3>
         <ul>
            {todos.map((todo) => (
               <ul key={todo.id}>
                  <Link to={`/todo/${todo.id}`}>
                     {todo.name}
                  </Link>
               </ul>
            ))}
         </ul>

         <TodoForm/>
      </div>
   )
}