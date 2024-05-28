import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { putEditTodo } from "../api/api";
// import {queryClient} from '../../../index'

const Checkbox = ({ todo }) => {
  const queryClient = useQueryClient()
  const [checked, setChecked] = useState(JSON.parse(todo.checked));
  // console.log(checked);
  // console.log(todo.id);
  // console.log(JSON.parse(todo.checked));

  const { mutateAsync } = useMutation({
   mutationFn: ( payload) => putEditTodo(todo.id, payload),
    // cacheTime: 0,
    onMutate: () => {
      queryClient.invalidateQueries(["todos"])
    }
  })

  const handleCheckbox = (e) => {
    e.preventDefault();
   const checked = e.target.checked;
   setChecked(checked);

   const payload = {
    "title": todo.title,
    "description": todo.description,
    "checked": JSON.stringify(checked),
    "creationDate": todo.creationDate,
   }
   mutateAsync(payload) 
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => handleCheckbox(e)}
        checked={JSON.parse(checked)}
      />
    </>
  );
};

export default Checkbox;
