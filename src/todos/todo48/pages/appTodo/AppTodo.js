import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./AppTodo.css";

import ListTodo from "./components/ListTodo";
import Loader from "../../../../loaders/Loader";
import { Link, Navigate } from "react-router-dom";

import { fetchTodos } from "../../redux/features/todosSlice";

const AppTodo = ({setErPage}) => {
  const dispatch = useDispatch();
  const { status: isLoading, isFetching, error} = useSelector(state => state.todos)
 
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])

  return (
    <>
      {!!error ? (
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
          >
            Add new Todo
          </Link>
          <ListTodo setErPage={setErPage}/>
        </div>
      )}
    </>
  );
};

export default AppTodo;
