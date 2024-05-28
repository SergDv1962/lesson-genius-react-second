import { useQuery, useQueryClient } from "react-query";
import { getTodos } from "./api/api";

import "./TodoRouterTwo.css";
import ListTodo from "./components/ListTodo";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";

const TodoRouterTwo = () => {
  const [isBtnAddTodo, setIsBtnAddTodo] = useState(false);
  const [isBtIditTodo, setIsBtnIditodo] = useState(false);
  const [todoEditId, setTodoEditId] = useState('');

  const queryClient = useQueryClient();
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  const openWindowAddTodo = () => {
    queryClient.invalidateQueries(['todos']);
    setIsBtnAddTodo(true);
  };

  return (
    <div className="main-container">
      {isBtIditTodo ? (
        <EditTodo setIsBtnIditodo={setIsBtnIditodo} todoEditId={todoEditId}/>
      ) : isBtnAddTodo ? (
        <AddTodo setIsBtnAddTodo={setIsBtnAddTodo} />
      ) : (
        <>
          <h4>My application 'ToDo'</h4>
          <button onClick={openWindowAddTodo}>ADD ToDo</button>
          <ListTodo todos={todos} setIsBtnIditodo={setIsBtnIditodo} setTodoEditId={setTodoEditId} />
        </>
      )}
    </div>
  );
};

export default TodoRouterTwo;
