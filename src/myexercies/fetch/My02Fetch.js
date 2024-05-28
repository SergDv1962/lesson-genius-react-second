import { useEffect } from "react";
import { useState } from "react";


const My02Fetch = () => {
   const [data, setData] = useState();
   const urls = 'https://jsonplaceholder.typicode.com/todos';

   useEffect(()=>{
      const fetchData = async (url) => {
         const response = await fetch(url);
         const json = await response.json();
         try { 
            setData(json) 
         } catch (error) {
            console.log(error.message); 
         } 
      }

      fetchData(urls)
   },[])
   console.log(data);
   
   return (
      <>
        <h3>My02Fetch</h3>
        {data?.map(el => <ul key={el.id}>
         <li>
            <p>{el.id} {el.title}</p>

         </li>
        </ul>)}
      </>
   )
}
   
 
export default My02Fetch;