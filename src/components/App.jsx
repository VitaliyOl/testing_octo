import React, { useState, useEffect } from 'react';

import GameInput from './GameInput/GameInput';
import api from '../services/fetchApi';
import GraphDisplay from './GraphDisplay/GraphDisplay';

const periods = [
  { label: '1w', days: 7 },
  { label: '1m', days: 30 },
  { label: '3m', days: 90 },
  { label: '6m', days: 180 },
  { label: '1y', days: 365 },
];

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalMentions, setTotalMentions] = useState(0);
  const [timeRange, setTimeRange] = useState('');
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const storedGraphData = localStorage.getItem('graphData');
    const storedTotalMentions = localStorage.getItem('totalMentions');
    const storedTimeRange = localStorage.getItem('timeRange');
    const storedSearchQuery = localStorage.getItem('searchQuery');

    if (
      storedGraphData &&
      storedTotalMentions &&
      storedTimeRange &&
      storedSearchQuery
    ) {
      setGraphData(JSON.parse(storedGraphData));
      setTotalMentions(parseInt(storedTotalMentions, 10));
      setTimeRange(storedTimeRange);
      setSearchQuery(storedSearchQuery);
    }
  }, []);

  const processGraphData = (totalMentions, days, startDate, endDate) => {
    let labels = [];
    let values = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    const dateIncrement = Math.ceil(days / 10);
    for (let d = start; d <= end; d.setDate(d.getDate() + dateIncrement)) {
      labels.push(new Date(d).toISOString().split('T')[0]);
    }

    const baseValue = Math.floor(totalMentions / labels.length);
    labels.forEach(() => {
      const variation = 0.8 + Math.random() * 0.4;
      values.push(baseValue * variation);
    });

    setGraphData({
      labels,
      datasets: [
        {
          label: 'Mentions',
          data: values,
          borderColor: 'blue',
          fill: false,
        },
      ],
    });
  };

  const handleGameSearch = async searchQuery => {
    setSearchQuery(searchQuery);
    const { totalMentions, startDate, endDate } = await api.fetchYouTubeData(
      searchQuery,
      365
    );
    setTotalMentions(totalMentions);
    setTimeRange('1 Year');
    processGraphData(totalMentions, 365, startDate, endDate);
  };

  const handlePeriodChange = async days => {
    const cacheKey = `mentions_${searchQuery}_${days}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { totalMentions, startDate, endDate } = JSON.parse(cachedData);
      setTotalMentions(totalMentions);
      setTimeRange(`${days === 365 ? '1 Year' : `${days / 30} Months`}`);
      processGraphData(totalMentions, days, startDate, endDate);
    } else {
      const { totalMentions, startDate, endDate } = await api.fetchYouTubeData(
        searchQuery,
        days
      );
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ totalMentions, startDate, endDate })
      );
      setTotalMentions(totalMentions);
      setTimeRange(`${days === 365 ? '1 Year' : `${days / 30} Months`}`);
      processGraphData(totalMentions, days, startDate, endDate);
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setSearchQuery('');
    setTotalMentions(0);
    setTimeRange('');
    setGraphData({
      labels: [],
      datasets: [],
    });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '50px',
        overflowY: 'auto',
      }}
    >
      <GameInput onSubmit={handleGameSearch} />
      <button
        onClick={handleReset}
        style={{ marginLeft: '20px', background: 'red', color: 'white' }}
      >
        Reset
      </button>
      <div>
        {periods.map(period => (
          <button
            key={period.label}
            onClick={() => handlePeriodChange(period.days)}
          >
            {period.label}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Game: {searchQuery}</h2>
        <h3>Total Mentions: {totalMentions}</h3>
        <h4>Time Range: {timeRange}</h4>
      </div>
      <GraphDisplay data={graphData} />
    </div>
  );
};
