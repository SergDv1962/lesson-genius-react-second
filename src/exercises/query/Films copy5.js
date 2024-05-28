import { useQuery } from "react-query";

const Films = () => {
  const {
    data: { results = [] } = {},
    isLoading,
    isError,
    error,
    ...otherData
  } = useQuery("key", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

     throw new Error("test error");

    return fetch("http://swapi.dev/api/films").then((res) => res.json());
  });

  console.log(otherData);

  return (
    <div>
      {isLoading
        ? "Loading..."
        : isError
        ? error.message
        : results.map((film) => <div key={film.title}>{film.title}</div>)}
    </div>
  );
};

export default Films;
