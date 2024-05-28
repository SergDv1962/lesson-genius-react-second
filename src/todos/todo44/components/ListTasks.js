import axios from "axios";
import "./listTasks.css";
import Checkbox from "./Checkbox";
import { useState } from "react";

const ListTasks = ({ tasks, setTasks, setIsEditBtn, setEditTaskId }) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isCheckboxLoading, setCheckboxLoading] = useState(false);

  const deleteTodoHandle = async (id) => {
    setIsDeleteLoading(true);
    await axios.delete(`todos/${id}`);
    setTasks((prev) => prev.filter((el) => el.id !== id));
    setIsDeleteLoading(false);
  };

  const editTodoHandle = (id) => {
    setEditTaskId(id);
    setIsEditBtn(true);
  };

  return (
    <div className="block-tasks">
      {isCheckboxLoading
        ? "Loading..."
        : tasks.map((item) => (
            <div key={item.id} className="box-todo">
              <div>
                <Checkbox
                  item={item}
                  setTasks={setTasks}
                  setCheckboxLoading={setCheckboxLoading}
                />{" "}
                {item.title}
              </div>
              <div>{item.description}</div>
              <div>{item.creationDate}</div>
              <button
                disabled={isDeleteLoading}
                onClick={() => deleteTodoHandle(item.id)}
              >
                {isDeleteLoading ? "loading..." : "DELETE"}
              </button>
              <button onClick={() => editTodoHandle(item.id)}>EDIT</button>
            </div>
          ))}
    </div>
  );
};

export default ListTasks;
