
import { useMutation, useQuery } from "react-query";
import ModalWindow from "./ModalWindow";
import { getEditTodo, getTodosList } from "../api/api";
import { queryClient } from "../../..";
import useInput from "./customComponent/useInput";
import useDate from "./customComponent/useDate";
import { Link, useParams } from "react-router-dom";

const EditTodo = ({ setEditBtnTodo, todoEditId }) => {
  const { paramId } = useParams();
  console.log(paramId);
  const {
    input: title,
    setInput: setTitle,
    handleChangeInput: handleChangeTitle,
  } = useInput();
  const {
    input: description,
    setInput: setDescription,
    handleChangeInput: handleChangeDescription,
  } = useInput();
  const date = useDate();

  const { data: editTodo, refetch } = useQuery({
    queryKey: ['todosList', paramId],
    queryFn: () => getTodosList(`todos/${paramId}`),
    initialData: () =>
      queryClient
        .getQueryData(['todosList'])
        .find((el) => el.id === paramId),
    onSuccess: () => {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
    },
  });

  const payload = {
    title: title,
    description: description,
    checked: editTodo.checked,
    creationDate: date,
  };
  
  const { mutate: saveEditTodo, isLoading } = useMutation({
    mutationFn: () => getEditTodo(paramId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todosList']);
      refetch();
      setTitle("");
      setDescription("");
    },
  });

  const handleSaveEditTodo = () => {
    saveEditTodo();
  };
 
  return (
    <div>
      <h3>Edit Todo</h3>
      <ModalWindow
        title={title}
        handleChangeTitle={handleChangeTitle}
        description={description}
        handleChangeDescription={handleChangeDescription}
        placeholderTitle="Loading..."
        placeholderDescriptin="Loading..."
      />
      <p> creationDate: {date}</p>
      <Link
        type="button"
        className="button btn-save"
        disabled={isLoading}
        onClick={handleSaveEditTodo}
        to='/todos'
      >
        {isLoading ? "Loading..." : "Save Edit Todo"}
      </Link>
    </div>
  );
};

export default EditTodo;
