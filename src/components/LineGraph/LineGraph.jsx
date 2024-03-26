import "./LineGraph.scss";
import { Chart, registerables } from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);
const allWeights = [
  { date: "2024-02-01", weight: 180.3 },
  { date: "2024-02-03", weight: 180.2 },
  { date: "2024-02-05", weight: 180.1 },
  { date: "2024-02-07", weight: 180 },
  { date: "2024-02-09", weight: 179.9 },
  { date: "2024-02-11", weight: 179.8 },
  { date: "2024-02-13", weight: 179.7 },
  { date: "2024-02-15", weight: 179.6 },
  { date: "2024-02-17", weight: 179.5 },
  { date: "2024-02-19", weight: 179.4 },
  { date: "2024-02-21", weight: 179.3 },
  { date: "2024-02-23", weight: 179.2 },
  { date: "2024-02-25", weight: 179.1 },
  { date: "2024-02-27", weight: 179 },
  { date: "2024-02-29", weight: 178.9 },
  { date: "2024-03-02", weight: 178.8 },
  { date: "2024-03-04", weight: 178.7 },
  { date: "2024-03-06", weight: 178.6 },
  { date: "2024-03-08", weight: 178.5 },
  { date: "2024-03-10", weight: 178.4 },
  { date: "2024-03-12", weight: 178.3 },
  { date: "2024-03-14", weight: 178.2 },
  { date: "2024-03-16", weight: 178.1 },
  { date: "2024-03-18", weight: 178 },
  { date: "2024-03-20", weight: 177.9 },
  { date: "2024-03-22", weight: 177.8 },
  { date: "2024-03-24", weight: 177.7 },
  { date: "2024-03-26", weight: 177.6 },
  { date: "2024-03-28", weight: 177.5 },
  { date: "2024-03-30", weight: 177.4 },
  // Add more weight records as needed
];
function LineGraph() {
  const data = {
    labels: [],
    datasets: [
      {
        label: "all weights",
        data: allWeights.map((entry) => entry.weight),
        borderColor: "rgba(89, 89, 89,1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // const data = {
  //   labels: [
  //     "02/24",
  //     "02/25",
  //     "02/26",
  //     "02/27",
  //     "02/28",
  //     "02/29",
  //     "03/01",
  //     "03/02",
  //     "03/03",
  //     "03/04",
  //     "03/05",
  //     "03/06",
  //     "03/07",
  //     "03/08",
  //     "03/09",
  //     "03/10",
  //     "03/11",
  //     "03/12",
  //     "03/13",
  //     "03/14",
  //     "03/15",
  //     "03/16",
  //     "03/17",
  //     "03/18",
  //     "03/19",
  //     "03/20",
  //     "03/21",
  //     "03/22",
  //     "03/23",
  //     "03/24",
  //     "03/25",
  //   ],
  //   datasets: [
  //     {
  //       label: "last 30 days",
  //       data: [
  //         // Weight records for the last 30 days go here
  //         // Replace these placeholder values with actual weight records
  //         179.5, 178.8, 178.2, 177.9, 178.3, 177.6, 176.8, 177.2, 177.4, 177.1,
  //         176.9, 176.5, 175.9, 175.5, 175.3, 175.1, 174.8, 174.4, 174.2, 173.9,
  //         173.6, 173.4, 173.2, 172.9, 172.7, 172.5, 172.3, 172.1, 171.9, 171.7,
  //         171.5,
  //       ],
  //       borderColor: "rgba(89, 89, 89,1)",
  //       fill: true,
  //       tension: 0.3,
  //     },
  //   ],
  // };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Weight/lb",
        },
      },
    },
  };

  return (
    <section className="chart">
      {data.labels.length === 0 ? (
        <div>No records for selected period</div>
      ) : (
        <div className="chart__container">
          <Line data={data} options={options} />
        </div>
      )}
    </section>
  );
}

export default LineGraph;
