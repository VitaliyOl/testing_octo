import React from 'react';
import styled from 'styled-components';
import GraphDisplay from '../GraphDisplay/GraphDisplay';
import PeriodSelector from '../PeriodSelector/PeriodSelector';
import GraphDetails from '../GraphDetails/GraphDetails';

const GraphContainer = styled.div`
  position: relative;
  width: 80%;
  height: 500px;
  margin: 0 auto;
  background-color: #262626;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const GraphSection = ({
  periods,
  selectedPeriod,
  handlePeriodChange,
  graphData,
  totalMentions,
  timeRange,
}) => (
  <GraphContainer>
    <PeriodSelector
      periods={periods}
      selectedPeriod={selectedPeriod}
      handlePeriodChange={handlePeriodChange}
    />
    <GraphDisplay data={graphData} />
    <GraphDetails totalMentions={totalMentions} timeRange={timeRange} />
  </GraphContainer>
);

export default GraphSection;
