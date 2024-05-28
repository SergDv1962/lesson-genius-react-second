import { useQuery } from "react-query";

const Films = () => {
  const {
    data: { results = [] } = {},
    isLoading,
    isError,
    error,
  } = useQuery("key", async () => {
    return fetch(
      "http://swapi.dev/api/films"
      ).then((res) => res.json());
  }, {
   refetchOnWindowFocus: false,           //--------
  });

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
