import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { capitalize } from "./Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Chart = ({ name, baseStats }: { name: string; baseStats: number[] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Base Stats of ${capitalize(name)}`,
        font: {
          size: 14,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
        max: 255,
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  const data = {
    labels: ["HP", "Attack", "Defense", "Sp.Attack", "Sp.Defense", "Speed"],
    datasets: [
      {
        data: baseStats,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex flex-col w-[400px] md:w-[500px] items-center">
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
