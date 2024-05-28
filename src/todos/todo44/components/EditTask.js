import { useEffect, useState } from "react";
import { useDate } from "../api/useDate";
import { useFetch } from "../api/useFetch";
import { useInput } from "../api/useInput";
import ModalWindow from "./ModalWindow";
import axios from "axios";

const EditTask = ({ setTasks, editTakId, setIsEditBtn }) => {
  const [isSaveEditLoading, setIsSaveEditLoading] = useState(false);

  const {
    input: title,
    setInput: setTitle,
    handleChangeInput: handleChangeTitle,
  } = useInput();
  const {
    input: text,
    setInput: setText,
    handleChangeInput: handleChangeText,
  } = useInput();
  const date = useDate();

  const { data: editTask } = useFetch(`todos/${editTakId}`);

  useEffect(() => {
    setTitle(editTask.title);
    setText(editTask.description);
  }, [editTask]);

  const payload = {
    title: title,
    description: text,
    checked: editTask.checked,
    creationDate: date,
  };

  const handleEditTodo = async () => {
    setIsSaveEditLoading(true);
    const response = await axios.put(`todos/${editTakId}`, payload);
    setTasks((prev) =>
      prev.map((el) => {
        if (el.id === editTakId) {
          return response.data;
        }
        return el;
      })
    );
    setIsEditBtn(false);
    setIsSaveEditLoading(false);
  };

  return (
    <>
      <h3>Change task</h3>
      <ModalWindow
        title={title}
        text={text}
        handleChangeTitle={handleChangeTitle}
        handleChangeText={handleChangeText}
        placeholderEdit='Loading...'
      />
      <button disabled={isSaveEditLoading} onClick={handleEditTodo}>{isSaveEditLoading ? 'Loading...' : 'SAVE'}</button>
    </>
  );
};

export default EditTask;
