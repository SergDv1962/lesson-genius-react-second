import { useQuery } from "react-query";

const useGetFilms = () => 
   useQuery('films', async () => {
    return fetch(
      "http://swapi.dev/api/films"
      ).then((res) => res.json());
  });

const FilmsLength = () => {
   const {
    data: { results = [] } = {},
    isLoading
  } = useGetFilms();
   return isLoading ?
   'Loading...' : <p>Кількість фільмів: {results.length}</p>
}

const Films = ({queryKey}) => {
  const {
    data: { results = [] } = {},
    isLoading,
    isError,
    error,
    isFetching, 
  } = useGetFilms();
  return (
    <div>
      <FilmsLength/>
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
