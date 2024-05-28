import { useMutation } from "react-query";
import { deleteTodo } from "../api/api";
import { queryClient } from "../../..";
import Checkbox from "./Checkbox";
import { Link } from "react-router-dom";

const ListTodo = ({ todos }) => {
  const { mutateAsync: handleDeleteTodo, isLoading } = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries("todosList"),
  });

  return (
    <>
      {todos?.map((item) => (
        <div key={item.id}>
          <div>
            <Checkbox item={item} />
            {item.title}
          </div>
          <div>{item.description}</div>
          <Link
            type="button"
            className="button btn-delete"
            disabled={isLoading}
            onClick={() => handleDeleteTodo(item.id)}
          >
            {isLoading ? "Loading..." : "DELETE"}
          </Link>
          <Link
            type="button"
            className="button"
            onClick={() => queryClient.invalidateQueries("todosList")}
            to={`${item.id}`}
          >
            EDIT
          </Link>
        </div>
      ))}
    </>
  );
};

export default ListTodo;
