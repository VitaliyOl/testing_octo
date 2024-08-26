import React, { useState, useEffect } from 'react';

import GameInput from './GameInput/GameInput';
import SteamDataDisplay from './SteamDataDisplay/SteamDataDisplay';
import GameTitle from './GameTitle/GameTitle';
import GraphSection from './GraphSection/GraphSection';

import api from '../services/fetchApi';

const periods = [
  { label: '1w', days: 7 },
  { label: '1m', days: 30 },
  { label: '3m', days: 90 },
  { label: '6m', days: 180 },
  { label: '1y', days: 365 },
];

const getFromLocalStorage = (key, defaultValue = null) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : defaultValue;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getPeriodByLabel = label =>
  periods.find(period => period.label === label);

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [totalMentions, setTotalMentions] = useState(0);
  const [timeRange, setTimeRange] = useState('');
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });
  const [steamData, setSteamData] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('1y');

  useEffect(() => {
    const storedGraphData = getFromLocalStorage('graphData', {
      labels: [],
      datasets: [],
    });
    const storedTotalMentions = localStorage.getItem('totalMentions');
    const storedTimeRange = localStorage.getItem('timeRange');
    const storedSearchQuery = localStorage.getItem('searchQuery');
    const storedSteamData = getFromLocalStorage(
      `steamData_${storedSearchQuery}`
    );
    const storedSelectedPeriod = localStorage.getItem('selectedPeriod');

    if (storedSearchQuery && storedSelectedPeriod) {
      const period = getPeriodByLabel(storedSelectedPeriod);
      const cacheKey = `mentions_${storedSearchQuery}_${period.days}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const { totalMentions, graphData } = JSON.parse(cachedData);
        setGraphData(graphData);
        setTotalMentions(totalMentions);
        setTimeRange(
          period.days === 365 ? '1 Year' : `${period.days / 30} Months`
        );
        setSelectedPeriod(storedSelectedPeriod);
        setSearchQuery(storedSearchQuery);
        if (storedSteamData) setSteamData(storedSteamData);
        return;
      }
    }

    if (
      storedGraphData &&
      storedTotalMentions &&
      storedTimeRange &&
      storedSearchQuery &&
      storedSteamData &&
      storedSelectedPeriod
    ) {
      setGraphData(storedGraphData);
      setTotalMentions(parseInt(storedTotalMentions, 10));
      setTimeRange(storedTimeRange);
      setSearchQuery(storedSearchQuery);
      setSteamData(storedSteamData);
      setSelectedPeriod(storedSelectedPeriod);
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

    const baseValue = totalMentions / labels.length;
    let sum = 0;

    labels.forEach((_, index) => {
      let variation = 0.9 + Math.random() * 0.2;
      let value = baseValue * variation;
      values.push(value);
      sum += value;
    });

    const correctionFactor = totalMentions / sum;
    values = values.map(value => Math.round(value * correctionFactor));

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

    setToLocalStorage('graphData', {
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

    const cachedSteamData = getFromLocalStorage(`steamData_${searchQuery}`);
    if (cachedSteamData) {
      setSteamData(cachedSteamData);
    } else {
      const response = await api.fetchSteamData(searchQuery);
      setSteamData(response);
      setToLocalStorage(`steamData_${searchQuery}`, response);
    }

    const selectedPeriod = '1y';
    const period = getPeriodByLabel(selectedPeriod);
    const cacheKey = `mentions_${searchQuery}_${period.days}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { totalMentions, graphData } = JSON.parse(cachedData);
      setTotalMentions(totalMentions);
      setTimeRange('1 Year');
      setSelectedPeriod('1y');
      setGraphData(graphData);
    } else {
      const { totalMentions, startDate, endDate } = await api.fetchYouTubeData(
        searchQuery,
        period.days
      );
      setTotalMentions(totalMentions);
      setTimeRange('1 Year');
      setSelectedPeriod('1y');

      processGraphData(totalMentions, period.days, startDate, endDate);

      setToLocalStorage(cacheKey, {
        totalMentions,
        startDate,
        endDate,
        graphData: JSON.parse(localStorage.getItem('graphData')),
      });
    }

    localStorage.setItem('totalMentions', totalMentions);
    localStorage.setItem('timeRange', '1 Year');
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('selectedPeriod', '1y');
  };

  const handlePeriodChange = async days => {
    if (!searchQuery) {
      alert('Please enter a search query first.');
      return;
    }

    const cacheKey = `mentions_${searchQuery}_${days}`;
    const cachedData = localStorage.getItem(cacheKey);

    const periodLabel = periods.find(period => period.days === days).label;
    setSelectedPeriod(periodLabel);

    localStorage.setItem('selectedPeriod', periodLabel);

    if (cachedData) {
      const { totalMentions, graphData } = JSON.parse(cachedData);
      setTotalMentions(totalMentions);
      setTimeRange(days === 365 ? '1 Year' : `${days / 30} Months`);
      setGraphData(graphData);
    } else {
      const { totalMentions, startDate, endDate } = await api.fetchYouTubeData(
        searchQuery,
        days
      );
      setTotalMentions(totalMentions);
      setTimeRange(days === 365 ? '1 Year' : `${days / 30} Months`);

      processGraphData(totalMentions, days, startDate, endDate);

      const currentGraphData = getFromLocalStorage('graphData');
      setToLocalStorage(cacheKey, {
        totalMentions,
        startDate,
        endDate,
        graphData: currentGraphData,
      });
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setSearchQuery('');
    setTotalMentions(0);
    setTimeRange('');
    setSteamData(null);
    setSelectedPeriod('1y');
    setGraphData({
      labels: [],
      datasets: [],
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        padding: '50px',
        overflowY: 'auto',
      }}
    >
      <GameInput onSubmit={handleGameSearch} onReset={handleReset} />
      <GameTitle searchQuery={searchQuery} />
      <GraphSection
        periods={periods}
        selectedPeriod={selectedPeriod}
        handlePeriodChange={handlePeriodChange}
        graphData={graphData}
        totalMentions={totalMentions}
        timeRange={timeRange}
      />
      {steamData && <SteamDataDisplay steamData={steamData} />}
    </div>
  );
};
