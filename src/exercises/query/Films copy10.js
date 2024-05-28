import { useQuery } from "react-query";

const Films = ({queryKey}) => {
  const {
    data: { results = [] } = {},
    isLoading,
    isError,
    error,
    isFetching, 
  } = useQuery(queryKey, async () => {
    return fetch(
      "http://swapi.dev/api/films"
      ).then((res) => res.json());
  });

  return (
    <div>
      {isLoading
        ? "Loading..."
        : isError
        ? error.message
        : results.map((film) => ( 
            <div key={film.title}>
               {film.title}
            </div>
      ))}
      <br/>
      {isFetching ? 'Оновлення...': null}
    </div>
  );
};

export default Films;
