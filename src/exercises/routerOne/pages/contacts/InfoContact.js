import { useQuery } from "react-query";
import { getInfoContact } from "../../api/api";
import { useParams } from "react-router-dom";

const InfoContact = () => {
   const { id } = useParams()

   const { data: contact} = useQuery({
      queryKey: ['infoContact'],
      queryFn: () => getInfoContact(id),
   })

   console.log(contact?.name);
   
   return ( 
      <>
         <strong>{contact?.name}</strong>
         <br/>
         Info contact
      </>
    );
}
 
export default InfoContact;