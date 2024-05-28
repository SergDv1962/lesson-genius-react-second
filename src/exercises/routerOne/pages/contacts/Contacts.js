import { useQuery } from "react-query";
import { getContacts } from "../../api/api";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const Contacts = () => {
   const { data: contacts } = useQuery({
      queryKey: ["contacts"],
      queryFn: getContacts,
      refetchOnMount: true,
   })
   console.log(contacts);
   
   return ( 
      <>
         <b>Contacts</b>
         {contacts?.map((el) => (
            <Fragment key={el.id}>
               <hr/>
               <li >{el.name} {el.lastName}</li>
               <Link to={`${el.id}`} style={{paddingLeft: '50px', color: 'blue'}}>About this contact</Link>
            </Fragment>
            ))}
         <hr/>
      </>
    );
}
 
export default Contacts;