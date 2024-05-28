import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useRef } from "react";

const fetchTodos = async ({ pageParam = 0 }) => {
  return fetch(`api/todos?page=${pageParam}`).then((res) => res.json());
};

const useInfiniteQueryScrolling = (container, callback, offset = 0) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const onScroll = () => {
      const scrollContainer =
        container === document ? document.scrollingElement : container;
      // console.dir(scrollContainer);

      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - offset
      ) {
        callbackRef.current();
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => container.addEventListener("scroll", onScroll);
  }, [container, offset]);
};

export const Todos = () => {
  const {
    data: todos = [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["todos"], fetchTodos, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  useInfiniteQueryScrolling(document, () =>{
    if(!isFetchingNextPage){
      fetchNextPage()
    }
  }, 300);

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      <h3>Мій лист справ{isFetching ? "..." : null}</h3>
      <ul>
        {todos.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((todo) => (
              <li key={todo.id}>
                <Link to={`/todo/${todo.id}`}>{todo.name}</Link>
              </li>
            ))}
          </Fragment>
        ))}
      </ul>
      {isFetchingNextPage ? "------------------Загрузка..." : "+"}
      {/* <button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        далі {isFetchingNextPage ? "Загрузка..." : ""}
      </button> */}
    </div>
  );
};
