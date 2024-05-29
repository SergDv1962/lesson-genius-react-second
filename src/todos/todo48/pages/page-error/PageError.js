import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageError = ({erPage}) => {
   const errorTodos = useSelector(state => state.todos.error)
   console.log(errorTodos, "hello error");

   return ( 
      <div>
         <h3>Page error</h3>
         <p>Error todos: {errorTodos}</p>
         <p>{erPage}</p>
         <Link to="/" className="btn btn-return">Back to home</Link>
      </div>
    );
}
 
export default PageError;