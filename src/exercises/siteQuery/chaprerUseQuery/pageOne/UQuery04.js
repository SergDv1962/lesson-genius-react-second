import { useQuery } from "react-query";


const useGetAloys = () =>
  useQuery({
    queryKey: ["aloys"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetch(`http://localhost:3030/aloys/contains[0]`).then((res) => res.json());
    },
  });

export default function UQuery04() {
  const { data, isFetching, isLoading, isSuccess, isError, error } =
    useGetAloys();

  console.log(data, isFetching, isSuccess, isError);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h2>Tasks list{isFetching ? "..." : null}</h2>
      {data.map((el, ind) => (
        <li key={ind}>{el.nameElement}</li>
      ))}
      
    </>
  );
}
