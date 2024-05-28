import { useMutation } from "react-query";
import { deleteTodo } from "../api/api";
import { queryClient } from "../../../";
import Checkbox from "./Checkbox";


const ListTodo = ({ todos, setEditBtnTodo, setTodoEditId }) => {
   
   const handleEditBtnTodo = (id) => {
      setTodoEditId(id)
      setEditBtnTodo(true);
   }

  const { mutateAsync: handleDeleteTodo, isLoading } = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries("todosList"),
  });

  return (
    <>
      {todos?.map((item) => (
        <div key={item.id}>
          <div><Checkbox item={item}/>{item.title}</div>
          <div>{item.description}</div>
          <button
            disabled={isLoading}
            onClick={() => handleDeleteTodo(item.id)}
          >
            {isLoading ? "Loading..." : "DELETE"}
          </button>
          <button onClick={() => handleEditBtnTodo(item.id)}>EDIT</button>
        </div>
      ))}
    </>
  );
};

export default ListTodo;
