import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { addContact } from "../api/api";

const AddContact = () => {
   const queryClient = useQueryClient()
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [about, setAbout] = useState("");

  const payload = {
    name: name,
    lastName: lastName,
    about: about,
  };

  const { mutateAsync} = useMutation({
    mutationFn: () => addContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries("contactsList");
    },
  });

  const handleAddContact = () => {
   mutateAsync()
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };
  const handleChangeLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };
  const handleChangeAbout = (e) => {
    const value = e.target.value;
    setAbout(value);
  };

  return (
    <div>
      <h1>AddContact</h1>
      <div className="box-addContact">
        <input
          onChange={(e) => handleChangeName(e)}
          type="text"
          placeholder="name"
        />
        <input
          onChange={(e) => handleChangeLastName(e)}
          type="text"
          placeholder="last name"
        />
        <input
          onChange={(e) => handleChangeAbout(e)}
          type="text"
          placeholder="about"
        />
      </div>
      <Link to={"/contact"}
         onClick={handleAddContact}
      className="btn btn-blue">
        Save new Contact
      </Link>
      <Link to={"/contact"} className="btn">
        Come back
      </Link>
    </div>
  );
};

export default AddContact;
