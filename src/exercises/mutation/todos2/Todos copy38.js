import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const fetchTodos = async ({pageParam=0}) => {
   
   return fetch(`api/todos?page=${pageParam}`)
     .then((res) => res.json());
 }

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
      if(lastPage.length === 0) {
        return undefined;
      }
      return pages.length + 1;
    }
  },);
  
  console.log(todos);

  return isLoading ? (
    "Loading..."
  ) : (
    <div>
      <h3>Мій лист справ{isFetching ? "..." : null}</h3>
      <ul>
        {todos.pages.map((page, index) => 
          <Fragment key={index}>
            {page.map((todo) => (
                <ul key={todo.id}>
                  <Link to={`/todo/${todo.id}`}>
                    {todo.name}
                  </Link>
                </ul>
              ))}
          </Fragment>
        )}
        
        
      </ul>

      <button onClick={fetchNextPage} 
         disabled={!hasNextPage || isFetchingNextPage}
         >
        далі {isFetchingNextPage ? '...' : ''}
      </button>
    </div>
  );
};
