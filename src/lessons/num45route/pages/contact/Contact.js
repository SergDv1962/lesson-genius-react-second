import { useQuery } from "react-query";
import { getContactsList } from "../../api/api";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["contactsList"],
    queryFn: getContactsList,
    refetchOnMount: true,
  });
  console.log(data);
  
  return (
    <>
      <h1 style={{ margin: "0 auto" }}>Contact</h1>
      {isFetching ? (
        <p>Loader...</p>
      ) : (
        <ul>
          {data.map((contact) => (
            <Fragment key={contact.id}>
               <li>{`${contact.name} ${contact.lastName}`}</li>
               <Link to={(`${contact.id}`)}>
                  {' '}
                  Watch about this contact
               </Link>
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
};

export default Contact;
