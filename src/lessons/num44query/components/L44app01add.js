import { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../..";
import { addContact } from "../api/Api01";

const L44app01add = ({setIsAdd}) => {

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

   const payload = {
      name: inputName,
      lastName: inputLastName,
      about: "this is information about user",
    };

    const { mutate: addNewContact } = useMutation({
      mutationFn: () => addContact(payload),
      onSuccess: () => {
        queryClient.invalidateQueries("contactsList");
      },
    });
  

   const handleAddContact = () => {
      addNewContact(payload)
      setIsAdd(false);
   }

   return ( 
      <>
         <input onChange={(e) => handleAddName(e)} value={inputName}/>
         <input onChange={(e) => handleAddLastName(e)} value={inputLastName}/>
         <button onClick={handleAddContact}>Save New Contact</button>
      </>
    ); 
}
 
export default L44app01add;