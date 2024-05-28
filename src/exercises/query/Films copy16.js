import { useState } from "react";
import { useQuery } from "react-query";

const useGetFilm = (film) =>
  useQuery(
    ['films', film],             //----------L15
    async () => {
      return fetch(`http://swapi.dev/apiПОМИЛКА/films?search=${film}`).then((res) =>
        res.json()
      );
    },
    {
      retry: 6,            // ------ L16 при помилці (потрібно її зробити наприклад у url api) скільки запитів до серверу
      retryDelay: (attemptIndex) => 
        Math.min(1000 * 2 ** attemptIndex, 30000),  // --L16 запроси робляться з затримкою збільшуючить з кожним разом (не рекомендують використовувати)
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
