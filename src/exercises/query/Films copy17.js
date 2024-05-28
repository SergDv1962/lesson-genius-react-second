import { useState } from "react";
import { useQuery } from "react-query";
import { Planet } from "./Planet";

const useGetFilm = (film) =>
  useQuery(
    ['films', film],            
    async () => {
      return fetch(`http://swapi.dev/api/films?search=${film}`).then((res) =>
        res.json()
      );
    },
    {
      enabled: !!film,   
    }
  );

const SearchFilm = ({ film }) => {
  const {
    data: { results = [] } = {},
    isLoading,
    error,
    isError,
    isFetching,
  } = useGetFilm(film);
  return (
    <div>
      {" "}
      {isLoading
        ? "Loading..."
        : isError
        ? error.message
        : results.map((film) => <div key={film.title}>
            {film.title}
            {film.planets.map((planet) => {
              return <Planet key={planet} planetUrl={planet}/>
            })}
          </div>)}
      <br />
      {isFetching ? "Оновлення..." : null}
    </div>
  );
};

const Films = ({ queryKey }) => {
  const [film, setFilm] = useState("");

  return (
    <div>
      <input
        type="text"
        value={film}
        onChange={(e) => setFilm(e.target.value)}
      />
      <SearchFilm film={film} />
    </div>
  );
};

export default Films;
