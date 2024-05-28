import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { getContactsList, deleteContact } from "./api/Api01";
import { queryClient } from "../..";
import { useState } from "react";
import L44app01add from "./components/L44app01add";
import L44app01edit from "./components/L44app01edit";

axios.defaults.baseURL = "http://localhost:3030/";

const L44app01 = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContactId, setEditContactId] = useState("");

  // Get ContactsList

  const { data, isFetching } = useQuery({
    queryKey: "contactsList",
    queryFn: getContactsList,
  });

  // Add

  const addFormContact = () => {
    setIsAdd(true);
  };

  // Delete

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries("contactsList");
    },
  });

  // Edit

  const handleEditContact = (id) => {
    setIsEdit(true);
    setEditContactId(id);
  };
  
  return (
    <div>
      <header>
        <h1>Contacts</h1>
      </header>
      {isAdd ? (
        <L44app01add setIsAdd={setIsAdd} />
      ) : isEdit ? (
        <L44app01edit 
          setIsEdit={setIsEdit} 
          editContactId={editContactId} />
      ) : (
        <main>
          <ul>
            {isFetching ? (
              <p>Loading...</p>
            ) : (
              data?.map((contact) => (
                <li key={contact.id} style={{ display: "flex", gap: "10px" }}>
                  <p>
                    {contact.name} {contact.lastName} {contact.id}
                  </p>
                  <button onClick={() => 
                    deleteTodo(contact.id)}>
                      Delete
                  </button>
                  <button onClick={() => 
                    handleEditContact(contact.id)}>
                    Edit
                  </button>
                </li>
              ))
            )}
          </ul>
          <button onClick={addFormContact}>{"Add"}</button>
        </main>
      )}
    </div>
  );
};

export default L44app01;
