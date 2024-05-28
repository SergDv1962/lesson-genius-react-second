import { useState } from "react";
import Films from "./Films";


const ExerciseQuery = () => {
   const [isOpen, setIsOpen] = useState(false);
   return ( 
      <div>
         <button
         onClick={()=>{setIsOpen(!isOpen)}}>
            clock
         </button>
         {isOpen ? <Films/> : null}
      </div>
    );
}
 
export default ExerciseQuery;