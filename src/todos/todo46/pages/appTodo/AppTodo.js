import { useQuery } from "react-query";
import { getTodos } from "./api/Api";
import ListTodo from "./components/ListTodo";
import Loader from "../../../../loaders/Loader";
import { Link, Navigate } from "react-router-dom";

import "./AppTodo.css";

const AppTodo = ({setErPage}) => {
  
  const {
    data: todos,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery(["todos"], () => getTodos("todos"), {
    cacheTime: 0,
    onError: (error) => {
      const info = 'Error message: ' + error.message + ', Error response: ' + error.response.data
      setErPage(info);
    },
  });

  


  const handleAddTodo = () => {
    refetch();
  };

  return (
    <>
      {isError ? (
        <Navigate to={'/error-page'}/>
      ) : isLoading ? (
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
          <Link
            to={"/apptodo/addtodo"}
            className={"btn btn-Add"}
            onClick={handleAddTodo}
          >
            Add new Todo
          </Link>
          <ListTodo todos={todos} setErPage={setErPage}/>
        </div>
      )}
    </>
  );
};

export default AppTodo;
