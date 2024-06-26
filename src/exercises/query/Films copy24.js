
import { useQuery } from "react-query";
import { queryClient } from "../../index";
import { Link } from "react-router-dom";

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

  const { data } = useGetFilms();

  return  (
    <ul>
      {
        data?.map((film) => (
          <li key={film.url}>
            <b>Film:</b>
            <Link to={film.url.replace(/https:\/\/swapi.dev\/api\/films\//g,'',)}>
              {film.title}
            </Link>
          </li>
        ))
      }
    </ul>
  );
};

export default Films;
