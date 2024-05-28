import { useReducer } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { queryClient } from "../../index";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";

const FilmPage = () => {
  const { filmId } = useParams();
  // const history = useHistory()
  const [count, increment] = useReducer((c) => c + 1, 0);

  const url = `https://swapi.dev/api/films/${filmId}/`;

  const { data, isLoading, isFetching } = useQuery(
    ["film", url],
    () =>
      new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
        fetch(url).then((res) => res.json())
      ),
    {
      staleTime: Infinity,  // ---L25
      onSuccess: (data) => {
        increment(); // приймає позитивну відповідь
      },
    },
    {
      onError: (error) => {
        // приймає помилку
      },
    },
    {
      onSettled: (data, error) => {
        //виконуєтся завжди
      },
    }
  );

  return isLoading ? (
    <div>"Loading..."</div>
  ) : (
    <>
      <div>
        <>
          <Link to={"/"}>back</Link>
          {/* <button onClick={()=> history.goBack()}>back</button> */}
        </>
        <h1>{data.title}</h1>
        <h2>episode:{data.episode_id}</h2>
        <strong>description</strong>
        <p>{data.opening_crawl}</p>
      </div>
      <button onClick={() => 
        queryClient.invalidateQueries(
          ["film", url,],
          {
            refetchActive: false, // ---L25
          },
          )}>
        Зробити наши дані старими
      </button>
      {isFetching ? `Оновлення... #${count}` : null}
    </>
  );
};

export default FilmPage;
