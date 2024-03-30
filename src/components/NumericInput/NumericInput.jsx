import "./NumericInput.scss";

function NumericInput({ value, setValue, label = "" }) {
  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue((prevValue) => prevValue - 1);
  };

  const handleInputChange = (e) => {
    const newValue = Math.max(Number(e.target.value), 0);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div className="numeric">
      <h2 className="numeric__title">{label}</h2>
      <div className="numeric__field">
        <button
          className="numeric__button"
          onClick={handleDecrement}
          type="button"
        >
          -
        </button>
        <input
          className="numeric__input"
          type="number"
          value={value}
          onChange={handleInputChange}
          min="0"
        />
        <button
          className="numeric__button"
          onClick={handleIncrement}
          type="button"
        >
          +
        </button>
        <p className="numeric__unit">
          {label.toLowerCase().includes("weight") ? "lb" : "cm"}
        </p>
      </div>
    </div>
  );
}

export default NumericInput;
