import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSingleContact } from "../../api/api";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContent";

const SingleContact = () => {
  const { id } = useParams();

  const value = useContext(AuthContext);
  console.log(value);
  

  const { data, isFetching } = useQuery({
    queryKey: ["singleContact"],
    queryFn: () => getSingleContact(id),
  });

  return isFetching ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>Name: {data.name}</p>
      <p>Last name: {data.lastName}</p>
      <p>About: {data.about}</p>
      <b>SingleContact</b>
    </div>
  );
};

export default SingleContact;
