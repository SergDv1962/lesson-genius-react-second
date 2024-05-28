import { useState } from "react";
import { useMutation } from "react-query";
import {queryClient} from '../../../index'

export const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const onChangeInput = (
    { target: { value = "" } = {} }) => 
      setTodo(value);

  const {mutate, ...other} = useMutation((todo) =>
    fetch("api/todos", {
      method: "POST",
      body: todo,
    }),{
      onSuccess: () => {
        setTodo('')
        queryClient.invalidateQueries('todos')
      }
    }
  )
  console.log(other);
  

  return (
    <div>
      <input type="text"
       value={todo} onChange={onChangeInput} />
      <button disabled={other.isLoading} onClick={()=>mutate(todo)}>{
        other.isLoading 
          ? 'збереження'
          : other.isError
          ? 'помилка запросу'
          : other.isSuccess
          ? 'збережено'
          : 'зберегти'}
      </button>
    </div>
  );
};
