import { useQuery } from "react-query";
import { queryClient } from "../../index";

const useGetFilms = (url) =>
  useQuery(
    ["films", url],
    () =>
      new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>  // -- L20 проміс та сеттайм тільки для ініціалізації затримки щоб бачити процес загрузки
        fetch(url).then((res) => res.json())
      ),
    {
      initialData: () =>
         queryClient
            .getQueryData("films") // --- L20 'films це наш ключ у кеші
            ?.results?.find((film) => film.url === url),
    }
  );

const FilmPage = ({ url }) => {
  const { data, isLoading, isFetching } = useGetFilms(url);

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
      {isFetching ? "Оновлення..." : null}
    </>
  );
};

export default FilmPage;
