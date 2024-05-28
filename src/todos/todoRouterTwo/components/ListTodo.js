import { useMutation, useQueryClient } from "react-query";
import { deleteTodos } from "../api/api";
// import { queryClient } from '../../../index'
import Checkbox from "./Checkbox";

const ListTodo = ({ todos, setIsBtnIditodo, setTodoEditId }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo } = useMutation({
   mutationFn: (id) => deleteTodos(id),
   onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
   }
  });

   const handleDeleteTodo = (id) => {
      deleteTodo(id)
   }

   const handleEditTodo =(id) => {
      setIsBtnIditodo(true)
      setTodoEditId(id)
      queryClient.invalidateQueries(['todos'])
   }

  return (
    <>
      {todos?.map((todo) => (
        <div key={todo.id} className="item-box">
          <p><Checkbox todo={todo}/> {todo.title}</p>
          <p>{todo.description}</p>
          <div className="item-box-btns">
            <button onClick={()=>handleDeleteTodo(todo.id)}>DELETE</button>
            <button onClick={() => handleEditTodo(todo.id)}>EDIT</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListTodo;
