import React from 'react';
import styled from 'styled-components';

// Контейнер для всіх секцій
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 50px;
  width: 72%;
`;

// Стилі для кожної секції (Store, Twitch, Owner)
const Section = styled.div`
  background-color: #213547;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 200px;
`;

// Заголовок кожної секції
const SectionTitle = styled.h3`
  color: #a0a0a0;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: bold;
`;

// Стилі для кожного текстового елементу
const DataText = styled.p`
  color: #ffffff;
  font-size: 18px;
  margin: 5px 0;

  strong {
    color: #00aaff;
  }
`;

// Секція Steam Charts, яка займає всю ширину
const FullWidthSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #213547;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 70%;
  text-align: center;
`;

const SteamChartsTitle = styled.h3`
  color: #a0a0a0;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const SteamChartsText = styled.p`
  font-size: 20px;
  margin: 5px 0;
  color: #00aaff;
  line-height: 1.5;

  span {
    color: #a0a0a0;
    font-weight: normal;
    font-size: 18px;
  }
`;

const SteamDataDisplay = ({ steamData }) => {
  if (!steamData) return null;

  return (
    <>
      <Container>
        {/* Store Data */}
        <Section>
          <SectionTitle>Store Data</SectionTitle>
          <DataText>
            <strong>{steamData.storeData.followers}</strong> followers
          </DataText>
          <DataText>
            <strong>{steamData.storeData.topSellers}</strong> in top sellers
          </DataText>
          <DataText>
            <strong>{steamData.storeData.positiveReviews}</strong> positive
            reviews
          </DataText>
          <DataText>
            <strong>{steamData.storeData.negativeReviews}</strong> negative
            reviews
          </DataText>
          <DataText>
            <strong>{steamData.storeData.positivePercentage}</strong> positive
            reviews
          </DataText>
        </Section>

        {/* Twitch Data */}
        <Section>
          <SectionTitle>Twitch Stats</SectionTitle>
          <DataText>
            <strong>{steamData.twitchData.twitchViewers}</strong> viewers right
            now
          </DataText>
          <DataText>
            <strong>{steamData.twitchData.twitchPeak24}</strong> 24-hour peak
          </DataText>
          <DataText>
            <strong>{steamData.twitchData.twitchAllTimePeak}</strong> all-time
            peak
          </DataText>
        </Section>

        {/* Owner Data */}
        <Section>
          <SectionTitle>Owner Estimations</SectionTitle>
          <DataText>
            <strong>{steamData.ownerData.ownerVG}</strong> by VG Insights
          </DataText>
          <DataText>
            <strong>{steamData.ownerData.ownerGamalytic}</strong> by Gamalytic
          </DataText>
          <DataText>
            <strong>{steamData.ownerData.ownerPlayTracker}</strong> by
            PlayTracker
          </DataText>
        </Section>
      </Container>

      {/* Steam Charts - окрема секція на всю ширину */}
      <FullWidthSection>
        <SteamChartsTitle>Steam Charts</SteamChartsTitle>
        <SteamChartsText>
          {steamData.steamCharts.playersNow} <span>players now</span>
        </SteamChartsText>
        <SteamChartsText>
          {steamData.steamCharts.peak24} <span>24-hour peak</span>
        </SteamChartsText>
        <SteamChartsText>
          {steamData.steamCharts.allTimePeak} <span>all-time peak</span>
        </SteamChartsText>
      </FullWidthSection>
    </>
  );
};

export default SteamDataDisplay;
