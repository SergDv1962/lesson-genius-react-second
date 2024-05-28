import { useMutation, useQuery } from "react-query";
import ModalWindow from "./ModalWindow";
import { getEditTodo, getTodosList } from "../api/api";
import { queryClient } from "../../..";
import useInput from "./customComponent/useInput";
import useDate from "./customComponent/useDate";

const EditTodo = ({setEditBtnTodo, todoEditId}) => {
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

   const { data: editTodo, refetch } = useQuery({
      queryKey: ['todosList', todoEditId],
      queryFn:() => getTodosList(`todos/${todoEditId}`),
      initialData:() => 
         queryClient.getQueryData(['todosList']).find(el=>el.id===todoEditId),
      onSuccess: () => {
         setTitle(editTodo.title)
         setDescription(editTodo.description)
         },
   });

   const payload = {
      title: title,
      description: description,
      checked: editTodo.checked,
      creationDate: date,
   }

   const { mutate: saveEditTodo, isLoading} = useMutation ({
      mutationFn: () => getEditTodo(todoEditId, payload),
      onSuccess: () => {
         queryClient.invalidateQueries("todosList");
         refetch();
         // setTitle('');
         // setDescription('');
         
         
         },
      }
   )

   const handleSaveEditTodo = () => {
      saveEditTodo();
      setEditBtnTodo(false);
   }

   return ( 
       <div>
          <h3>Edit Todo</h3>
          <ModalWindow 
            title={title}
            handleChangeTitle={handleChangeTitle}
            description={description}
            handleChangeDescription={handleChangeDescription}
            placeholderTitle='Loading...'
            placeholderDescriptin='Loading...'
            />
           <p> creationDate: {date}</p>
          <button disabled={isLoading} onClick={handleSaveEditTodo}>{isLoading ? 'Loading...' : 'Save Edit Todo'}</button>
       </div>
    );
}
 
export default EditTodo;