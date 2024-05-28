import { useState } from "react";
import { useQuery } from "react-query";

// const useGetFilms = () =>
//   useQuery("films", async () => {
//     return fetch("http://swapi.dev/api/films").then((res) => res.json());
//   });

const useGetFilm = (film) =>
  useQuery(
    film,
    async () => {
      return fetch(`http://swapi.dev/api/films?search=${film}`).then((res) =>
        res.json()
      );
    },
    {
      enabled: !!film,   // ----------- lesson 14. позбавляємось пустого запроса-- ур13 був без цього
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
        : results.map((film) => <div key={film.title}>{film.title}</div>)}
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
