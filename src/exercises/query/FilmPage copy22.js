import { useReducer } from "react";
import { useQuery } from "react-query";

const FilmPage = ({ url }) => {
  const [count, increment] = useReducer((c) => c + 1, 0);
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
