import { useQuery } from "react-query";

export default function UQuery03() {
  const { data, isFetching, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () =>{
      await new Promise ((resolve)=>setTimeout(resolve, 3000));
      return fetch("http://localhost:3030/tasks").then((res) => res.json())
      }, 
  });

  console.log(data, isFetching, isSuccess, isError);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
      <>
         <h2>Tasks list{isFetching ? '...' : null}</h2>
         <ul>
            {data?.map((task) => 
               <li key={task.id}>
                  {task.title}
               </li>)}
         </ul>
      </>
      
   );
}

