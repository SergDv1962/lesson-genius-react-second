import { useDispatch, useSelector } from "react-redux";

import ModalWindowTodo from "./ModalWindowTodo";
import { useInput } from "./customs/useInput";
import { Link } from "react-router-dom";
import { addNewTodos } from "../../../redux/features/todosSlice";

const AddTodo = () => {
  const { loading: isLoading } = useSelector(state => state.todos)
  const dispatch = useDispatch();

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

  const handleAddNewTodo = () => {
    dispatch(addNewTodos({title, info}));
    setTitle('');
    setInfo('');
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
