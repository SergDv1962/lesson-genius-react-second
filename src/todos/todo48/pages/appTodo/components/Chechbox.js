import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos, toggleCheckbox } from "../../../redux/features/todosSlice";

const Checkbox = ({ item }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(JSON.parse(item.checked));
  
  const id = item.id;

  const handleCheckbox = (e) => {
    e.preventDefault();
    const checked = e.target.checked;
    setChecked(JSON.stringify(checked));
    const payload = {
      title: item.title,
      description: item.description,
      checked: JSON.stringify(checked),
      creationDate: item.creationDate,
    };
    dispatch(toggleCheckbox({id, payload}))
    dispatch(fetchTodos())
  };

  return (
    <div>
      <input
        type="checkbox"
        onChange={(e) => handleCheckbox(e)}
        checked={checked}
      />
    </div>
  );
};

export default Checkbox;
