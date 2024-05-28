import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editTodo } from "../api/Api";

const Checkbox = ({ item }) => {
  const client = useQueryClient();
  const [checked, setChecked] = useState(JSON.parse(item.checked));

  const { mutateAsync } = useMutation( (payload) =>
    editTodo(item.id, payload),
    {
      onMutate: () => {
        client.invalidateQueries(["todos"]);
      },
    }
  );

  const handleCheckbox = (e) => {
    e.preventDefault();
    const checked = e.target.checked;
    setChecked(checked);
    const payload = {
      title: item.title,
      description: item.description,
      checked: JSON.stringify(checked),
      creationDate: item.creationDate,
    };
    mutateAsync(payload);
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
