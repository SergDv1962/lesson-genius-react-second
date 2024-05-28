import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getSingleContact } from "../../api/api";

const SingleContact = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location);

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
