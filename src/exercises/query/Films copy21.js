import { useState } from "react";
import { useQuery } from "react-query";
import FilmPage from "./FilmPage";
import { queryClient } from "../../index";

const useGetFilms = () =>
  useQuery(["films"], () =>
    fetch("http://swapi.dev/api/films")
      .then((res) => res.json())
      .then(({ results }) => {
        results.forEach((film) =>
          queryClient.setQueryData(
            ['film', film.url], film,
          ),
        );
        return results;
      }),
  );

const Films = ({ queryKey }) => {
  const [filmUrl, setFilmUrl] = useState("");

  const { data } = useGetFilms();

  return filmUrl ? (
    <>
      <button onClick={() => setFilmUrl('')}>back</button>
      <FilmPage url={filmUrl}/>
    </>
  ) : (
    <ul>
      {data?.map((film) => (
        <li key={film.url}>
          <strong>Film:</strong>
          <a href="#" onClick={() => setFilmUrl(film.url)}>
            {film.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Films;
