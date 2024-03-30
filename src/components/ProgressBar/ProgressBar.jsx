import "./ProgressBar.scss";

function ProgressBar() {
  const progress = 10;
  return (
    <div className="progressBar">
      <svg
        width="100%"
        // height="auto"
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
          style={{ strokeDashoffset: (282.743 * progress) / 100 }}
        />
      </svg>
      <div className="progressBar__summary">
        <h2 className="progressBar__title">133</h2>
        <h2 className="progressBar__text">12lb left to achieve the goal</h2>
      </div>
      <div className="progressBar__labels">
        <h2 className="progressBar__label">140lb</h2>
        <h2 className="progressBar__label">120lb</h2>
      </div>
    </div>
  );
}

export default ProgressBar;
