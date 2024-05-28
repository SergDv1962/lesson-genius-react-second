import { useState } from "react";
import { useQuery } from "react-query";
import FilmPage from "./FilmPage";

const useGetFilms = () =>
  useQuery(["films"], () =>
    fetch("http://swapi.dev/api/films").then((res) => res.json())
  );

const Films = ({ queryKey }) => {
  const [filmUrl, setFilmUrl] = useState("");

  const { data } = useGetFilms();
  console.log(data);

  return filmUrl ? (
    <>
      <button onClick={() => setFilmUrl('')}>back</button>
      <FilmPage url={filmUrl}/>
    </>
  ) : (
    <ul>
      {data?.results?.map((film) => (
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
