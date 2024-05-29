import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "./Chechbox";
import { deleteTodos, fetchTodos } from "../../../redux/features/todosSlice";

const ListTodo = () => {
  const todos = useSelector(state => state.todos.todos);
  const { loading: isLoading} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodos(id));
    dispatch(fetchTodos());
  };
  return (
    <div className="boxList">
      {todos?.map((item) => (
        <div key={item.id} className="boxItem">
          <Checkbox item={item} />
          <div className="boxItem-block">
            <div>
              <b className="textColorGreen">Title:</b> {item.title}
            </div>
            <div>
              <b className="textColorGreen">Info:</b> {item.description}
            </div>
            <div>
              <b className="textColorGreen">Date:</b> {item.creationDate}
            </div>
            <div>
              <Link
                onClick={() => handleDeleteTodo(item.id)}
                className="btn btn-delete"
              >
                {isLoading ? 'Loading...' : 'DELETE'}
              </Link>
              <Link 
                to={`${item.id}`} 
                className="btn btn-edit"
              >EDIT</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTodo;
