import { useQuery } from "react-query";
import {queryClient} from '../../../../index';

const useGetPage = (url) =>
  useQuery(
    ["page", url],
    () =>
      new Promise((resolve) => setTimeout(resolve, 6000)).then(() =>
        fetch(url).then((res) => res.json())
      ),
    {
      cacheTime: 10000,
      enabled: !!url,
      staleTime: 10000,
      initialData: () => queryClient.getQueryData('films')
         ?.results?.find(item=>item.url===url),
    }
  );

const UQuery07page = ({ filmUrl }) => {
  const { data, isLoading, isFetching } = useGetPage(filmUrl);
  console.log(data);

  return (
    <>
      {isLoading ? (
         <div>"Loading..."</div>
      ) : (
        <div>
          <div>
            Title film: <b>{data?.title} </b>
          </div>
          <div>
            Episode_id: <b>{data?.episode_id} </b>
          </div>
          <div>
            <b>Opening_crawl:</b> {data?.opening_crawl}
          </div>
        </div>
      )}
      {isFetching ? "Оновлення..." : null}
    </>
  );
};

export default UQuery07page;
