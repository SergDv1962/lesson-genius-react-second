import { useMutation } from "react-query";
import ModalWindow from "./ModalWindow";
import { addTodo } from "../api/api";
import { queryClient } from "../../..";
import useInput from "./customComponent/useInput";
import useDate from "./customComponent/useDate";
import { Link } from "react-router-dom";

const AddTodo = () => {
  const {
    input: title,
    // setInput: setTitle,
    handleChangeInput: handleChangeTitle,
  } = useInput();
  const {
    input: description,
    // setInput: setDescription,
    handleChangeInput: handleChangeDescription,
  } = useInput();
 const date = useDate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (payload) => addTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries("todosList");
      // setTitle('');
      // setDescription('');
    },
  });;

  const addNewTodo = async () => {
    const payload = {
      title: title,
      description: description,
      checked: "false",
      creationDate: date,
    };
    try {
      await mutateAsync(payload);
      queryClient.invalidateQueries("todosList");
    } catch (error) {
      alert('Something went wrong', error.message)
      console.log(error);
    }
  };

  return (
    <>
      <ModalWindow
        title={title}
        handleChangeTitle={handleChangeTitle}
        description={description}
        handleChangeDescription={handleChangeDescription}
        placeholderTitle='Write  name of your todo'
        placeholderDescriptin='Write description of your todo'
      />
      <Link 
        type="button" 
        className="button btn-save" 
        disabled={isLoading} 
        onClick={addNewTodo}
        to='/todos'>
        {isLoading ? "loading..." : "add new todo"}
      </Link>
      <Link 
        type="button" 
        className="button btn-return" 
        to='/todos'
        >return
      </Link>
    </>
  );
};

export default AddTodo;
