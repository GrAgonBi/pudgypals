import "./AddWeight.scss";

function AddWeight({ setAddWeight }) {
  const handleCancel = () => {
    setAddWeight(false);
  };
  return (
    <section className="add">
      <div className="add__content">
        <div className="add__buttons">
          <button className="add__button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="add__button">Save</button>
        </div>
        <form className="add_form"></form>
      </div>
    </section>
  );
}

export default AddWeight;
