import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Filler,
  Legend
);

const GraphContainer = styled.div`
  background-color: #262626;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  height: 400px;
`;

const GraphDisplay = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        ticks: {
          color: '#a0a0a0',
        },
        grid: {
          color: '#333',
        },
      },
      y: {
        ticks: {
          color: '#a0a0a0',
          callback: value => {
            return value.toLocaleString();
          },
        },
        grid: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#a0a0a0',
        },
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1a1a1a',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#00aaff',
        borderWidth: 1,
      },
    },
    elements: {
      line: {
        borderColor: '#00aaff',
        borderWidth: 2,
        fill: false,
      },
      point: {
        radius: 3,
        backgroundColor: '#00aaff',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <GraphContainer>
      <Line data={data} options={options} />
    </GraphContainer>
  );
};

export default GraphDisplay;
