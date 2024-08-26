import React from 'react';
import styled from 'styled-components';

const MentionsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
`;

const TotalMentions = styled.h3`
  color: #00aaff;
  font-size: 18px;
  margin: 5px 0;
  font-weight: bold;
`;

const TimeRange = styled.h4`
  color: #a0a0a0;
  font-size: 16px;
  margin: 5px 0;
`;

const GraphDetails = ({ totalMentions, timeRange }) => (
  <MentionsContainer>
    <TotalMentions>Total Mentions: {totalMentions}</TotalMentions>
    <TimeRange>Time Range: {timeRange}</TimeRange>
  </MentionsContainer>
);

export default GraphDetails;
