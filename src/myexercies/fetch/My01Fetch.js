import { useEffect } from "react";
import { useState } from "react";


const My01Fetch = () => {
   const [data, setData] = useState();

   useEffect(()=>{
      const fetchData = async () => {
         await fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setData(json))
           
      }

      fetchData()
   },[])
   console.log(data);
   
   return (
      <>
        <h3>My01Fetch</h3>
        {data?.map(el => <ul key={el.id}>
         <li>
            <p>{el.id} {el.title}</p>

         </li>
        </ul>)}
      </>
   )
}
   
 
export default My01Fetch;