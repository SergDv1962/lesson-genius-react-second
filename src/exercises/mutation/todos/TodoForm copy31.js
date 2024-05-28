import { useState } from "react";

export const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const onChangeInput = ({ 
      target: { value = "" } = {},
   }) => setTodo(value);

   const onSave = () => {
      fetch('api/todos', {
         method: 'POST',
         body: todo,
      });
   }

  return (
    <div>
      <input type="text" value={todo} onChange={onChangeInput}/>
      <button onClick={onSave}>зберегти</button>
    </div>
  );
};
