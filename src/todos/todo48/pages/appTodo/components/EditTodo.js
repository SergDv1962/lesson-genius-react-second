import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ModalWindowTodo from "./ModalWindowTodo";
import { useDate } from "./customs/useDate";
import { useInput } from "./customs/useInput";
import { editTodos } from "../../../redux/features/todosSlice";

const EditTodo = () => {
  const { editTodoId } = useParams();
  const dispatch = useDispatch();
  const  todos  = useSelector(state => state.todos.todos)
  const todo = todos.find(el => el.id === editTodoId)

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

  useEffect(()=>{
    setTitle(todo.title);
    setInfo(todo.description)
  },[todo])

  const payload = {
    title: title,
    description: info,
    checked: todo.checked,
    creationDate: useDate(),
  };

  const handleSaveEditTodo = () => {
    dispatch(editTodos({editTodoId, payload}))
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
