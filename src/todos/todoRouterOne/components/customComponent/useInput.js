import { useState } from "react";

const useInput = () => {
   const [input, setInput] = useState('');
   
   const handleChangeInput = (e) => {
      const value = e.target.value;
      setInput(value);
   }
   return {input, setInput, handleChangeInput}
}
 
export default useInput;