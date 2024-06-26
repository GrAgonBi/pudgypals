import "./LineGraph.scss";
import { Chart, registerables } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { formatDate, formatYeardate, generateDateArray } from "../../helper";

// Define a custom plugin to draw dashed line for x-axis border
const dashedLinePlugin = {
  id: "dashedLinePlugin",
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const xAxis = chart.scales["x"];
    const yAxis = chart.scales["y"];

    // Set line style
    ctx.setLineDash([5, 5]); // Set dash pattern (5 pixels on, 5 pixels off)
    ctx.lineWidth = 1; // Set line width
    ctx.strokeStyle = "#e1e1e1"; // Set line color

    // Draw dashed line for x-axis border
    ctx.beginPath();
    ctx.moveTo(xAxis.left, yAxis.bottom); // Start from the bottom-left corner of the chart
    ctx.lineTo(xAxis.right, yAxis.bottom); // Draw line to the bottom-right corner of the chart
    ctx.stroke();
  },
};

Chart.register(dashedLinePlugin, ...registerables);

function LineGraph({ weights, selectedPeriod }) {
  const label =
    selectedPeriod === "last7days"
      ? weights.map((entry) => formatDate(entry.date))
      : generateDateArray(weights).map((date) =>
          selectedPeriod === "alltime" ? formatYeardate(date) : formatDate(date)
        );

  const data = {
    labels: weights.map((entry) => entry.date),
    datasets: [
      {
        data: weights.map((entry) => {
          return entry.weight;
        }),
        borderColor: "#afafaf",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          display: false,
        },

        border: {
          display: false,
        },
      },

      y: {
        position: "right", // Display y-axis on the right

        grid: {
          display: false,
        },

        display: weights.length === 0 ? false : true,

        title: {
          display: false,
        },

        ticks: {
          // Specify the desired number of ticks on the y-axis
          stepSize: 5, // This will show ticks at an interval of 5
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
  };

  return (
    <section className="chart">
      {!label.length && (
        <div className="chart__notice">
          No records for the selected time interval
        </div>
      )}
      <div className="chart__labels">
        {label.map((date, index) => (
          <p className="chart__label" key={index}>
            {date}
          </p>
        ))}
      </div>
      <div className="chart__container">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default LineGraph;
