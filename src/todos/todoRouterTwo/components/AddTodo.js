import { useState } from "react";
import { useMutation } from "react-query";
import { addTodo } from "../api/api";
import { useDate } from "./customs/useDate";
import { queryClient } from "../../..";

const AddTodo = ({setIsBtnAddTodo}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const date = useDate();

  const payload = {
    title: title,
    description: description,
    checked: "false",
    creationDate: date,
  };
  
  const { mutate: addNewTodo } = useMutation({
    mutationFn: (payload) => addTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setTitle("");
      setDescription("");
      setIsBtnAddTodo(false)
   }});

  const handleSaveAddTodo = () => {
    addNewTodo(payload);
    
   
  };

  const handleAddTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const handleAddDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  return (
    <>
      <h4>Add new Todo</h4>
      <input type="text" onChange={(e) => handleAddTitle(e)} />
      <input type="text" onChange={(e) => handleAddDescription(e)} />
      <button onClick={handleSaveAddTodo}>SAVE</button>
    </>
  );
};

export default AddTodo;
