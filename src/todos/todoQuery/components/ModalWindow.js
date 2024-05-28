const ModalWindow = ({
  title,
  handleChangeTitle,
  description,
  handleChangeDescription,
  placeholderTitle,
  placeholderDescriptin
}) => {
  return (
    <div>
      <input 
        type="text" 
        onChange={(e) => handleChangeTitle(e)} 
        value={title}
        placeholder={placeholderTitle} 
      />
      <input
        type="text"
        onChange={(e) => handleChangeDescription(e)}
        value={description}
        placeholder={placeholderDescriptin}
      />
    </div>
  );
};

export default ModalWindow;
