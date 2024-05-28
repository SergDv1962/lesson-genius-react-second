
import axios from "axios";
import { useInput } from "../api/useInput";
import ModalWindow from "./ModalWindow";
import { useDate } from "../api/useDate";
import { useState } from "react";


const AddTask = ({ setTasks, setIsAddBtn}) => {
  const [isAddLoading, setIsAddLoading] = useState(false);
  const { input: title, setInput: setTitle, handleChangeInput: handleChangeTitle } = useInput();
  const { input: text, setInput: setText, handleChangeInput: handleChangeText } = useInput();
  const date = useDate();

  const addTodoHandle = async () => {
    setIsAddLoading(true);
   const response = await axios.post("todos", {
     title: title,
     description: text,
     checked: "false",
     creationDate: date,
   });
   setTasks((prev) => [...prev, response.data]);
   setTitle('');
   setText('');
   setIsAddBtn(false);
   setIsAddLoading(false);
 };

 const canselHandle = () => {
   setIsAddBtn(false);
 }


  return (
    <>
      <ModalWindow
        title={title}
        text={text}
        handleChangeTitle={handleChangeTitle}
        handleChangeText={handleChangeText}
      />
      <button disabled={isAddLoading} onClick={addTodoHandle}>{isAddLoading ? 'Loading...' : 'SAVE'}</button>
      <button onClick={canselHandle}>Cancel</button>
    </>
  );
};

export default AddTask;
