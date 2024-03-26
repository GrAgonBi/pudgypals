import "./Input.scss";

function Input({ name, type, label }) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input type={type} name={name} className="field__input" />
    </div>
  );
}

export default Input;
