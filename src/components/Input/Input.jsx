import "./Input.scss";

function Input({ name, type, label, className, required, disable }) {
  return (
    <div className="field">
      <label className="field__label">
        {label}
        {required ? "*" : ""}
      </label>
      <input type={type} name={name} className={className} disabled={disable} />
    </div>
  );
}

export default Input;
