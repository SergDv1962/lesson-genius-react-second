import axios from "axios";

const Checkbox = ({ item, setTasks, setCheckboxLoading }) => {
  const handleCheckbox = async (e) => {
    setCheckboxLoading(true);
    const checked = e.target.checked;

    const response = await axios.put(`todos/${item.id}`, {
      title: item.title,
      description: item.description,
      checked: JSON.stringify(checked),
      creationDate: item.creationDate,
    });
    
    setTasks((prev) =>
      prev.map((el) => {
        if (el.id === item.id) {
          return response.data;
        }
        return el;
      })
    );
    setCheckboxLoading(false);
  };

  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => handleCheckbox(e)}
        checked={JSON.parse(item.checked)}
      />
    </>
  );
};

export default Checkbox;
