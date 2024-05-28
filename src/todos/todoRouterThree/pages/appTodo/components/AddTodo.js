import { useMutation, useQueryClient } from "react-query";
import ModalWindowTodo from "./ModalWindowTodo";
import { useInput } from "./customs/useInput";
import { Link } from "react-router-dom";
import { addTodo } from "../api/Api";
import { useDate } from "./customs/useDate";

const AddTodo = () => {
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
  console.log(title);

  const date = useDate();

  const payload = {
    title: title,
    description: info,
    checked: "false",
    creationDate: date,
  };

  const { mutateAsync, isLoading } = useMutation(
    ["todos"],
    (payload) => addTodo(payload),
    {
      onSuccess: () => {
        client.invalidateQueries(['todos'])
        setTitle('');
        setInfo('');
      },
    }
  );

  const handleAddNewTodo = () => {
    mutateAsync(payload);
  };

  return (
    <div>
      <h3>Add new Todo</h3>
      <ModalWindowTodo
        title={title}
        setTitle={setTitle}
        handleChangeTitle={handleChangeTitle}
        info={info}
        setInfo={setInfo}
        handleChangeInfo={handleChangeInfo}
        placeholder={'введіть ваші данні'}
      />
      <Link
        to={"/apptodo"}
        onClick={handleAddNewTodo}
        className="btn btn-Add btn-AddSave"
      >
        {isLoading ? 'Loading...' : 'Save new Todo'}
      </Link>
    </div>
  );
};

export default AddTodo;
