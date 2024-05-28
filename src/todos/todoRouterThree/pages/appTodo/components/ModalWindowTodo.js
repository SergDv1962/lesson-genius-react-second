const ModalWindowTodo = ({
  title,
  setTitle,
  handleChangeTitle,
  info,
  setInfo,
  handleChangeInfo,
  placeholder,
}) => {
  return (
    <>
      <div>
        <label>Title: </label>
        <input
          type="text"
          onChange={(e) => handleChangeTitle(e)}
          value={title || ""}
          placeholder={placeholder}
        />
      </div>
      <div>
        <label>Info: </label>
        <input
          type="text"
          onChange={(e) => handleChangeInfo(e)}
          value={info || ""}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default ModalWindowTodo;
