import { Link, useParams } from "react-router-dom";
import ModalWindowTodo from "./ModalWindowTodo";
import { useDate } from "./customs/useDate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useInput } from "./customs/useInput";
import { editTodo, getTodos } from "../api/Api";

const EditTodo = () => {
  const { editTodoId } = useParams();
  const client = useQueryClient();
  const {
    input: title,
    setInput: setTitle,
    handleChangeInput: handleChangeTitle,
  } = useInput();

  const {
    input: info,
    setInput: setInfo,
    handleChangeInput: handleChangeInfo,
  } = useInput();

  const date = useDate();

  const { data: editTask, refetch } = useQuery(
    ["todos", editTodoId],
    () => getTodos(`todos/${editTodoId}`),
    {
      initialData: () =>
        client.getQueryData(["todos"])
         .find((el) => el.id === editTodoId),
      onSuccess: () => {
        setTitle(editTask.title);
        setInfo(editTask.description);
      },
    }
  );

  const payload = {
    title: title,
    description: info,
    checked: editTask.checked,
    creationDate: date,
  };

  const { mutateAsync } = useMutation(
    () => editTodo(editTodoId, payload),
    {
      onSuccess: () => {
        client.invalidateQueries(["todos"]);
        refetch();
      },
    }
  );

  const handleSaveEditTodo = () => {
    mutateAsync();
  };

  return (
    <div>
      <h3>Edit Todo</h3>
      <ModalWindowTodo
        title={title}
        setTitle={setTitle}
        handleChangeTitle={handleChangeTitle}
        info={info}
        setInfo={setInfo}
        handleChangeInfo={handleChangeInfo}
        placeholder={"Loading..."}
      />
      <Link
        onClick={handleSaveEditTodo}
        className="btn btn-Add btn-AddSave"
        to={"/apptodo"}
      >
        Save
      </Link>
    </div>
  );
};

export default EditTodo;
