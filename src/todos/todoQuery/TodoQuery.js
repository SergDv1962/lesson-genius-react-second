import { useQuery } from "react-query";
import "./todoQuery.css";
import { getTodosList } from "./api/api";
import Loader from "../todo44 copy/components/loaders/Loader";
import ListTodo from "./components/ListTodo";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

const TodoQuery = () => {
  const [isAddBtnTodo, setIsAddBtnTodo] = useState(false);
  const [isEditBtnTodo, setEditBtnTodo] = useState(false);
  const [todoEditId, setTodoEditId] = useState(null);

  const {
    data: todos,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["todosList"],
    queryFn: () => getTodosList("todos"),
  });

  const handleAddBtn = () => {
    setIsAddBtnTodo(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block-appTodo">
          <h3>TodoQuery</h3>
          {isAddBtnTodo ? (
            <AddTodo setIsAddBtnTodo={setIsAddBtnTodo} />
          ) : isEditBtnTodo ? (
            <EditTodo setEditBtnTodo={setEditBtnTodo} todoEditId={todoEditId}/>
          ) : (
            <div>
              <button onClick={handleAddBtn}>Add</button>
              <div className="box-tasksList">
                <ListTodo todos={todos} setEditBtnTodo={setEditBtnTodo} setTodoEditId={setTodoEditId}/>
              </div>
              {isFetching ? "Оновлення..." : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TodoQuery;
