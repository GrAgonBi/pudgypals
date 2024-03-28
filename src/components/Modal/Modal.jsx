import "./Modal.scss";

function Modal({
  children,
  handleClick,
  handleCancel,
  buttonText,
  needAllButtons = true,
}) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2>{children}</h2>
        <div className="modal__buttons">
          <button className="modal__button" onClick={handleClick}>
            {buttonText}
          </button>
          {needAllButtons && (
            <button className="modal__button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
