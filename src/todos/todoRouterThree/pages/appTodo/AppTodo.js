import { useQuery } from "react-query";
import { getTodos } from "./api/Api";
import ListTodo from "./components/ListTodo";
import Loader from "../../../../loaders/Loader";
import { Link } from "react-router-dom";

import "./AppTodo.css";

const AppTodo = () => {
  const {
    data: todos,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    ["todos"], 
    () => getTodos("todos"),
    {
      cacheTime: 0,
    }
  );

  const handleAddTodo = () => {
    refetch();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="boxApp">
          <>
            {isFetching ? (
              <h3 className="fetchingInfo">!!! Іде оновлення</h3>
            ) : (
              <h3>Your App Todo</h3>
            )}
          </>
          <Link to={"/apptodo/addtodo"} 
            className={"btn btn-Add"}
            onClick={handleAddTodo}
          >
            Add new Todo
          </Link>
          <ListTodo todos={todos} />
        </div>
      )}
    </>
  );
};

export default AppTodo;
