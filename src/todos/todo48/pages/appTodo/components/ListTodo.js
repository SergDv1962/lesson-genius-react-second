import { Link } from "react-router-dom";
import Checkbox from "./Chechbox";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../api/Api";
import { useSelector } from "react-redux";

const ListTodo = () => {
  const todos = useSelector(state => state.todos.todos);
  console.log(todos)

   const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
   (id) => deleteTodo(id),
   {onSuccess: ()=>{
      client.invalidateQueries(['todos']);
    }}
   );

  const handleDeleteTodo = (id) => {
    mutateAsync(id);
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
