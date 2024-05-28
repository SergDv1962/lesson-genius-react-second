import { useMutation, useQuery } from "react-query";
import { addContact, getContactsList } from "./api/Api";

const HW4401list = () => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: "contactsList",
    queryFn: getContactsList,
  });

  const { mutateAsync } = useMutation({
    mutationFn: (payload) => addContact(payload),
  });

  const payload = {
    name: "Dima",
    lastName: "DSV",
    about: "this is information about user",
  };
  
  const addNewContact = async () => {
    try {
      await mutateAsync(payload);
      await refetch();
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div>
      <h3>HW4401lists</h3>
      <hr />
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        data?.map((contact) => (
          <div key={contact.id}>
            <div>
              {contact.name} {contact.lastName}
            </div>
            <button>DELETE</button>
            <button>EDIT</button>
          </div>
        ))
      )}
      <hr />
      <button onClick={addNewContact}>Add</button>
    </div>
  );
};

export default HW4401list;
