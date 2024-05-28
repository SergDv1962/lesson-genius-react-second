import { useState } from "react";
import { useMutation } from "react-query";
import {queryClient} from '../../../index';
import './mocks';

export const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const onChangeInput = ({
     target: { value = "" } = {},
   }) => setTodo(value);

  const {mutate, ...other} = useMutation(
    (todo) =>
      fetch("api/todos", {
        method: "POST",
        body: todo,
      }),
    {
      onMutate: (value) => {
        const oldTodos = queryClient.getQueryData(
          'todos'
        );
        queryClient.setQueriesData(
          ['todos'],
          (oldTodos) => [
            ...oldTodos,
            {
              id: new Date().getTime(),
              name: value,
            },
          ],
        );
        setTodo('');
        return () => 
          queryClient.setQueryData('todos', oldTodos);
      },
      onError: (error, value, rollback) => {
        if (typeof rollback === 'function'){
          rollback();
        }
        alert(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      }
    }
  )
 
  return (
    <div>
      <input type="text"
       value={todo} 
       disabled={other.isLoading}
       onChange={onChangeInput} />
      <button  
         onClick={() => mutate(todo)}>
          {other.isLoading 
          ? 'збереження'
          : other.isError
          ? 'помилка запросу'
          : other.isSuccess
          ? 'збережено'
          : 'зберегти'}
      </button>
      <div>
         {other.isError ? other.error.message : ''}
      </div>
    </div>
  );
};