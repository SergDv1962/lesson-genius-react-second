import { useQuery, useMutation } from "react-query";
import { getEditContact, editContact } from "../api/Api01";
import { useState } from "react";
import { queryClient } from "../../..";

const L44app01edit = ({setIsEdit, editContactId}) => {
   const [inputName, setInputName] = useState('');
   const [inputLastName, setInputLastName] = useState('');

   const handleAddName = (e) => {
      const value = e.target.value;
      setInputName(value);
   }
   const handleAddLastName = (e) => {
      const value = e.target.value;
      setInputLastName(value);
   }

   console.log(editContactId);
   
   const { data: editPerson, refetch } = useQuery({
      queryKey: ["contactsList", editContactId],
      queryFn: () => getEditContact(editContactId),
      initialData: () => 
        queryClient.getQueryData(["contactsList"]).find(el=>el.id === editContactId),
      onSuccess: () => {
        setInputName(editPerson.name);
        setInputLastName(editPerson.lastName);
        console.log(editPerson);
      },
    });
    console.log(editPerson);
    
    
     const person = {
    name: inputName,
    lastName: inputLastName,
    about: "this is information about user",
   };

  const {mutate: editorContact } = useMutation({
    mutationFn: () => editContact(editContactId, person),
    onSuccess: () => {
      queryClient.invalidateQueries('contactsList', editContactId);
      refetch();
    },
  });

    const handleSaveEditContacts = () => {
      editorContact(editContactId);
      setInputName(person.name);
      setInputLastName(person.lastName);
      setIsEdit(false);

    };

   return ( 
      <>
        <div>
          <div>
          <input onChange={(e) => handleAddName(e)} value={inputName}/>
         <input onChange={(e) => handleAddLastName(e)} value={inputLastName}/>
          </div>
          <button onClick={handleSaveEditContacts}>SAVE</button>
        </div> 
      </>
    );
}
 
export default L44app01edit;