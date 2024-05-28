import { useReducer } from "react";

const PageOne = () => {
   return <strong>I am Page One</strong>
}
const PageTwo = () => {
   return <strong>I am Page Two</strong>
}


const Toggle = () => {
   const [isShow, toggle] = useReducer(isShow => !isShow, false);
   return (
      <>
         <button onClick={toggle}>toggle</button>
         {isShow ? <PageOne /> : <PageTwo/>}
      </>
    );
}
 
export default Toggle;