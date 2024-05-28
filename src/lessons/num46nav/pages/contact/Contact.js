import { useMutation, useQuery } from "react-query";
import { deleteContact, getContactsList } from "../../api/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../loaders/Loader";
import { useState } from "react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  
  const { isFetching } = useQuery({
    queryKey: ["contactsList"],
    queryFn: getContactsList,
    onSuccess: (data) => {
      setContacts(data);
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: handleDelete } = useMutation({
    mutationFn: deleteContact,
    onSuccess: (_, id) => {
      setContacts((prev) => prev.filter((item) => item.id !== id));
    },
  });

  return (
    <>
      <h1 style={{ margin: "0 auto" }}>Contact</h1>
      <button onClick={() => navigate(-1)}>Повернутись назад</button>
      {isFetching ? (
        <Loader />
      ) : (
        <ul className="box-list">
          {contacts?.map((contact) => (
            <li key={contact.id} className="box-item">
              <span>{`${contact.name} ${contact.lastName}`}</span>
              <button
                onClick={() => handleDelete(contact.id)}
                className="btn btn-delete"
              >
                Delete
              </button>
              <Link to={`${contact.id}`} className="btn">
                {" "}
                Watch about this contact
              </Link>
            </li>
          ))}
          <Link to="/contact/addcontact" className="btn btn-blue">Add contact</Link>
        </ul>
      )}
    </>
  );
};

export default Contact;
