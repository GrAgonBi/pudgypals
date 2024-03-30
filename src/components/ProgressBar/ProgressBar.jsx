import "./ProgressBar.scss";

function ProgressBar({ info }) {
  const { weight, initial, target } = info;

  const progress =
    (initial - weight) / (initial - target) < 0
      ? 0
      : (initial - weight) / (initial - target) > 1
      ? 1
      : (initial - weight) / (initial - target);

  return (
    <div className="progressBar">
      <svg
        width="100%"
        viewBox="0 0 200 100"
        className="progressBar__container"
        style={{ "--stroke-ratio": 1 }}
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          className="progressBar__background-circle"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          className="progressBar__progress-circle"
          style={{ strokeDashoffset: 282.743 * progress }}
        />
      </svg>
      <div className="progressBar__summary">
        <h2 className="progressBar__title">{weight}</h2>
        <h2 className="progressBar__text">
          {Math.abs(weight - target)} lb left to achieve the goal
        </h2>
      </div>
      <div className="progressBar__labels">
        <h2 className="progressBar__label">{initial}lb</h2>
        <h2 className="progressBar__label">{target}lb</h2>
      </div>
    </div>
  );
}

export default ProgressBar;
