import { useReducer } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom";

const FilmPage = () => {
  const { filmId } = useParams();
  // const history = useHistory()
  const [count, increment] = useReducer((c) => c + 1, 0);

   const url = `http://swapi.dev/api/films/${filmId}/`;

  const { data, isLoading, isFetching } = useQuery(
    ["films", url],
    () =>
      new Promise((resolve) => setTimeout(resolve, 2000)
      ).then(() =>
        fetch(url).then((res) => res.json())
      ),
    {
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
          <Link to={'/'}>back</Link>
          {/* <button onClick={()=> history.goBack()}>back</button> */}
        </>
        <h1>{data?.title}</h1>
        <h2>episode:{data?.episode_id}</h2>
        <strong>description</strong>
        <p>{data?.opening_crawl}</p>
      </div>
      {isFetching ? `Оновлення... #${count}` : null}
    </>
  );
};

export default FilmPage;
