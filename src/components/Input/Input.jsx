import "./Input.scss";

function Input({ name, type, label, className }) {
  return (
    <div className="field">
      <label className="field__label">{label}*</label>
      <input type={type} name={name} className={className} />
    </div>
  );
}

export default Input;
