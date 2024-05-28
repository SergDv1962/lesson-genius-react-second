import { useState } from "react";
import { useMutation } from "react-query";
import { getEditTodo } from "../api/api";
import { queryClient } from "../../..";

const Checkbox = ({ item }) => {
  const [checked, setChecked] = useState(JSON.parse(item.checked));

  const { mutate: changeCheckbox } = useMutation({
    mutationFn: (payload) => getEditTodo(item.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["todosList"]);
    },
  });

  const handleCheckbox = (e) => {
    e.preventDefault();
    const checked = e.target.checked;
    const payload = {
      title: item.title,
      description: item.description,
      checked: JSON.stringify(checked),
      creationDate: item.creationDate,
    };
    setChecked(checked);
    changeCheckbox(payload);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => handleCheckbox(e)}
        checked={JSON.parse(checked)}
      />
    </>
  );
};

export default Checkbox;
