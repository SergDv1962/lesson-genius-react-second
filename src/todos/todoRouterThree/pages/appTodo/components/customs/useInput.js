import { useState } from "react";

export function useInput () {
   const [input, setInput] = useState('');

   const handleChangeInput = (e) => {
      const value = e.target.value;
      setInput(value);
   }
   return {input, setInput, handleChangeInput}
}