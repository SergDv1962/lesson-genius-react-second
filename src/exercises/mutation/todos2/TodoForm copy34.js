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
      onError: (error) => {
        alert(error);
      },
      onSettled: () => {
        setTodo('');
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