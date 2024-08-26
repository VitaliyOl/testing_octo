import axios from 'axios';
const { REACT_APP_YOUTUBE_API_KEY } = process.env;

const API_KEY = REACT_APP_YOUTUBE_API_KEY;

const fetchYouTubeData = async (query, days) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString();
  const endDateStr = new Date().toISOString();

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&publishedAfter=${startDateStr}&publishedBefore=${endDateStr}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const totalResults = response.data.pageInfo.totalResults;

    return {
      totalMentions: totalResults,
      startDate: startDateStr,
      endDate: endDateStr,
    };
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return { totalMentions: 0, startDate: startDateStr, endDate: endDateStr };
  }
};

async function fetchSteamFollowers() {
  try {
    const response = await axios.get(
      'https://steamdb.info/api/GetGraphFollowers/?appid=730',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          Accept: 'application/json',
          Referer: 'https://steamdb.info/app/730/charts/',
        },
      }
    );

    if (response.data && response.data.success) {
      console.log('Follower Data:', response.data.data);
    } else {
      console.log('Failed to retrieve data.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
const fetchSteamData = async searchQuery => {
  const appid = getSteamAppId(searchQuery);
  if (!appid) {
    console.error('AppID not found for the given game.');
    return null;
  }

  try {
    const url = `http://localhost:8080/steamdata/${appid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Steam API:', error);
    return null;
  }
};

const getSteamAppId = searchQuery => {
  const games = [
    { name: 'dota 2', appid: 570 },
    { name: 'counter-strike 2', appid: 730 },
    { name: 'grand theft auto V', appid: 271590 },
    { name: 'elden ring', appid: 1245620 },
    { name: 'banana', appid: 2923300 },
    { name: 'pubg: battlegrounds', appid: 578080 },
    { name: 'call of duty', appid: 1938090 },
  ];

  const game = games.find(
    g => g.name.toLowerCase() === searchQuery.toLowerCase()
  );
  return game ? game.appid : null;
};

const api = {
  fetchYouTubeData,
  fetchSteamFollowers,
  fetchSteamData,
};

export default api;
