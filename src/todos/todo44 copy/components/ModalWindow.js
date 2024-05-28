import './modalWindow.css'

const ModalWindow = ({ title, text, handleChangeTitle, handleChangeText, placeholderEdit}) => {
  return (
    <div className="box-modal">
      <div className='box-modal-input'>
        <label htmlFor="title">Title task</label>
        <input
          onChange={(e) => handleChangeTitle(e)}
          type="text"
          value={title || ""}
          id="title"
          placeholder={placeholderEdit}
        />
      </div>
      <div>
        <label htmlFor="text">Description task</label>
        <input
          onChange={(e) => handleChangeText(e)}
          type="text"
          value={text || ""}
          id="text"
          placeholder={placeholderEdit}
        />
      </div>
    </div>
  );
};

export default ModalWindow;
