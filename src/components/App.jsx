// import React, { useState } from 'react';

import GameInput from './GameInput/GameInput';
import DateRangePicker from './DateRangePicker/DateRangePicker';
import GraphDisplay from './GraphDisplay/GraphDisplay';

export const App = () => {
  // const [graphData, setGraphData] = useState({ datasets: [] });

  const datas = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Random Data',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  const handleDateChange = dates => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;

      if (start && end) {
        console.log('Selected range:', start, end);
      } else {
        console.error('Both start and end dates are required.');
      }
    } else {
      console.error('Expected an array of dates.');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '50px',
      }}
    >
      <GameInput />
      <DateRangePicker onChange={handleDateChange} />
      <GraphDisplay data={datas} />
    </div>
  );
};
