import styled from 'styled-components';

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #00aaff;
  font-size: 48px;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
`;

const GameTitle = ({ searchQuery }) => (
  <TitleContainer>
    <Title>Game: {searchQuery}</Title>
  </TitleContainer>
);

export default GameTitle;
