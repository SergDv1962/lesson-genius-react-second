import { useEffect, useState } from "react";
import { useFetch } from "./api/useFetch";
import ListTasks from "./components/ListTasks";

import "./todo44.css";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import Loader from "./components/loaders/Loader";

const Todo44 = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddBtn, setIsAddBtn] = useState(false);

  const [isEditBtn, setIsEditBtn] = useState(false);
  const [editTakId, setEditTaskId] = useState(null);

  const { data, isLoading, error } = useFetch("todos");

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const addBtnHandle = () => {
    setIsAddBtn(true);
  };

  if (error) {
    return (
      <div>
        Something went wrong <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="block-appTodo">
      <header>
        <h2>Todo44</h2>
      </header>
      <main>
        {isLoading ? (
          <Loader loading={isLoading} />
        ) : isAddBtn ? (
          <AddTask setTasks={setTasks} setIsAddBtn={setIsAddBtn} />
        ) : isEditBtn ? (
          <EditTask
            setTasks={setTasks}
            editTakId={editTakId}
            setIsEditBtn={setIsEditBtn}
          />
        ) : (
          <div className="box-tasksList">
            <button onClick={addBtnHandle}>Add TODO</button>
            <ListTasks
              setEditTaskId={setEditTaskId}
              setIsEditBtn={setIsEditBtn}
              tasks={tasks}
              setTasks={setTasks}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Todo44;
