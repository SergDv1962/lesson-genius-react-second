import { useState } from "react";
import { useDate } from "./customs/useDate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getEditTodo, putEditTodo } from "../api/api";
// import { queryClient } from "../../..";

const EditTodo = ({ setIsBtnIditodo, todoEditId }) => {
  const queryClient = useQueryClient()

  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState("");
  const date = useDate();

  const { data: editTask, refetch } = useQuery({
    queryKey: ["todos", todoEditId],
    queryFn: () => getEditTodo(todoEditId),
    initialData: () =>
      queryClient.getQueryData(["todos"]).find((el) => el.id === todoEditId),
    onSuccess: () => {
      setInputTitle(editTask.title);
      setInputDescription(editTask.description);
    },
  });
  
  const payload = {
    title: inputTitle,
    description: inputDescription,
    checked: editTask.checked,
    creationDate: date,
  };

  const { mutate: saveEditTodo } = useMutation({
   mutationFn: () => putEditTodo(todoEditId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      refetch();
    }
  })

  const handleEditTitle = (e) => {
    const value = e.target.value;
    setInputTitle(value);
  };
  const handleEditDescription = (e) => {
    const value = e.target.value;
    setInputDescription(value);
  };
  const handleSaveEditTodo = () => {
    saveEditTodo();
    setIsBtnIditodo(false);
  };

  return (
    <>
      <h4>Edit Todo</h4>
      <input
        type="text"
        onChange={(e) => handleEditTitle(e)}
        value={inputTitle}
      />
      <input
        type="text"
        onChange={(e) => handleEditDescription(e)}
        value={inputDescription}
      />
      <button onClick={handleSaveEditTodo}>SAVE</button>
    </>
  );
};

export default EditTodo;
