import React from 'react';
import { styled } from 'styled-components';

const PeriodButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== 'isSelected',
})`
  background: ${({ isSelected }) => (isSelected ? '#00aaff' : '#213547')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#00aaff')};
  border: none;
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const PeriodButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
`;

const PeriodSelector = ({ periods, selectedPeriod, handlePeriodChange }) => (
  <PeriodButtonContainer>
    {periods.map(period => (
      <PeriodButton
        key={period.label}
        isSelected={selectedPeriod === period.label}
        onClick={() => handlePeriodChange(period.days)}
      >
        {period.label}
      </PeriodButton>
    ))}
  </PeriodButtonContainer>
);

export default PeriodSelector;
