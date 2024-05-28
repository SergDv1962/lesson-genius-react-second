import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../index";

export const Todo = () => {
  const { id } = useParams();

  const { data: todo = {}, isLoading } = useQuery(
    ["todo", id], 
    async () => {
      return fetch(`api/todos/${id}`).then(
        (res) => res.json()
      );
    }
  );

  const [todoInput, setTodoInput] = useState("");
  const onChangeInput = ({ 
    target: { value = "" } = {}, 
  }) => setTodoInput(value);

  const { mutate, ...other } = useMutation(
    (todo) =>
      fetch(`api/todos`, {
        method: "PUT",
        body: todo,
      }).then((res) => res.json()),
    {
      onSuccess: (data, value) => {
        console.log(value);
        
        queryClient.setQueryData(
          ['todo', data.id.toString()],
          data,
        );
        queryClient.invalidateQueries([
          'todo',
          value.id.toString(),
        ]);
      },
      onSettled: () => {
        setTodoInput("");
      },
    },
  );

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      <h2>{todo.name}</h2>
      <div>
        <input
          type="text"
          value={todoInput}
          disabled={other.isLoading}
          onChange={onChangeInput}
        />
        <button
          onClick={() =>
            mutate({
              name: todoInput,
              id: todo.id,
            })
          }
        >
          {other.isLoading
            ? "збереження"
            : other.isError
            ? "помилка запросу"
            : other.isSuccess
            ? "збережено"
            : "зберегти"}
        </button>
      </div>
    </div>
  );
};
