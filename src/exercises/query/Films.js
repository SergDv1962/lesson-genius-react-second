
import { useQuery } from "react-query";
import { queryClient } from "../../index";
import { Link } from "react-router-dom";
import { fetchFilm } from "./FilmPage";

const useGetFilms = () =>
  useQuery(["films"], () =>
    fetch("http://swapi.dev/api/films")
      .then((res) => res.json())
      .then(({ results }) => results),
  );

const Films = ({ queryKey }) => {

  const { data } = useGetFilms();

  return  (
    <>
      <button onClick={() =>
          queryClient.invalidateQueries('film', {refetchInactive: true})
        }>
        Оновити все
      </button>
      <ul>
        {
          data?.map((film) => (
            <li key={film.url}
             onMouseEnter={()=>{
              queryClient.prefetchQuery(
                ["film", film.url],
              () => fetchFilm(film.url),
              {
                staleTime: Infinity,
              },
              )
             }}>
              <b>Film:</b>
              <Link to={film.url.replace(/https:\/\/swapi.dev\/api\/films\//g,'',)}>
                {film.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
    
  );
};

export default Films;
