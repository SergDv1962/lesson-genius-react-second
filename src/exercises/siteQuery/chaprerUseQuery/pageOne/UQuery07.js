import { useQuery } from "react-query";
import UQuery07page from "./UQuery07page";
import { useState } from "react";

const useGetFilms = () =>
  useQuery(
    ["films"], 
    () => fetch("http://swapi.dev/api/films")
      .then((res) => res.json()), 
    {
      cacheTime:10000,
      staleTime:10000,
    }
  );

const UQuery07 = () => {
  const [filmUrl, setFilmUrl] = useState("");
  const { data } = useGetFilms();
  console.log(filmUrl);

  return (
    <>
      {filmUrl ? (
        <>
          <button onClick={()=>setFilmUrl('')}>back</button>
          <hr/>
          <UQuery07page filmUrl={filmUrl} />
        </>
        
      ) : (
        data?.results.map((film) => (
          <li key={film.title}>
            <a href="#" onClick={() => setFilmUrl(film.url)}>
              {film.title}
            </a>
          </li>
        ))
      )}
    </>
  );
};

export default UQuery07;
