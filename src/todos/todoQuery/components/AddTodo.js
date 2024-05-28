import { useMutation } from "react-query";
import ModalWindow from "./ModalWindow";
import { addTodo } from "../api/api";
import { queryClient } from "../../..";
import useInput from "./customComponent/useInput";
import useDate from "./customComponent/useDate";

const AddTodo = ({ setIsAddBtnTodo }) => {
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
 const date = useDate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (payload) => addTodo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries("todosList");
      setTitle('');
      setDescription('');
      setIsAddBtnTodo(false);
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
      <button disabled={isLoading} onClick={addNewTodo}>{isLoading ? "loading..." : "add new todo"}</button>
      <button onClick={() => setIsAddBtnTodo(false)}>return</button>
    </>
  );
};

export default AddTodo;
