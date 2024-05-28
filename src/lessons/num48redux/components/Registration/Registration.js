import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addNewUser } from "../../api/api";

const Registration = () => {
   const queryClient = useQueryClient()
   const [username, setUserName] = useState("");
   const [email, setEmail] = useState("");
 
   const payload = {
     username: username,
     email: email,
   };
 
   const { mutateAsync} = useMutation({
     mutationFn: () => addNewUser(payload),
     onSuccess: () => {
       queryClient.invalidateQueries("userList");
     },
   });
 
   const handleAddUser = () => {
      if (username.length !== 0 && email.length !== 0) {
         mutateAsync();
         setUserName('');
         setEmail('');
      }
   }
 
   const handleName = (e) => {
     const value = e.target.value;
     setUserName(value);
   };
   const handleEmail = (e) => {
     const value = e.target.value;
     setEmail(value);
   };
 
   return ( 
      <div>
         <h3>Registration</h3>
         <hr/>
         <input onChange={(e) => handleName(e)}  placeholder="Username" value={username}/>
         <br/>
         <br/>
         <input onChange={(e) => handleEmail(e)} placeholder="Email" value={email}/>
         <br/>
         <br/>
         <button onClick={handleAddUser} className="btn btn-blue">Registrate</button>
         <hr/>
      </div>
    );
}
 
export default Registration;