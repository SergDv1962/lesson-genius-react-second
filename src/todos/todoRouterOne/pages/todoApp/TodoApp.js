import { useQuery } from "react-query";
// import { useState } from "react";
import { getTodosList } from "../../api/api";
import Loader from "../../components/loaders/Loader";
import ListTodo from "../../components/ListTodo";

// import AddTodo from "../../components/AddTodo";
// import EditTodo from "../../components/EditTodo";
import { Link } from "react-router-dom";

const TodoApp = () => {

  const {
    data: todos,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["todosList"],
    queryFn: () => getTodosList("todos"),
  });

  const handleAddBtn = () => {
    refetch()
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="block-appTodo">
          <h3>TodoRouter</h3>
          {
          // isAddBtnTodo ? (
          //   <AddTodo setIsAddBtnTodo={setIsAddBtnTodo} />
          // ) : 
          // isEditBtnTodo ? (
          //   <EditTodo setEditBtnTodo={setEditBtnTodo} todoEditId={todoEditId} />
          // ) : 
          (
            <div>
              <Link
                type="button"
                className="button btn-add"
                onClick={handleAddBtn}
                to='addtodo'
              >
                Add
              </Link>
              <div className="box-tasksList">
                <ListTodo
                  todos={todos}
                  // setEditBtnTodo={setEditBtnTodo}
                  // setTodoEditId={setTodoEditId}
                />
              </div>
              {isFetching ? "Оновлення..." : null}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TodoApp;
