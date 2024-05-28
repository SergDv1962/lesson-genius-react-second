import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { addContact, getContactsList } from "./api/Api";

axios.defaults.baseURL = "http://localhost:3030/";

const L44app = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: "contactsList",
    queryFn: getContactsList,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (payload) => addContact(payload),
  });

  const addNewContact = async () => {
    const payload = {
      name: "serg",
      lastName: "Brawn",
      about: "this is information about user",
    };
    try {
      await mutateAsync(payload);
      await refetch();
    } catch (error) {}
  };

  return (
    <div>
      <header>
        <h1>Contacts</h1>
      </header>
      <main>
        <ul>
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            data?.map((contact) => (
              <li 
                key={contact.id} 
                style={{ display: "flex", gap: "10px" }}>
                <p>
                  {contact.name} {contact.lastName}
                </p>
                <button>Delete</button>
                <button>Edit</button>
              </li>
            ))
          )}
        </ul>
        <button onClick={addNewContact}>{"Add"}</button>
        <button onClick={refetch}>refetch</button>
      </main>
    </div>
  );
};

export default L44app;
