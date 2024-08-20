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

// const fetchYouTubeData = async (query, days) => {
//   const today = new Date();
//   const startDate = new Date(today.setDate(today.getDate() - days));
//   const startDateStr = startDate.toISOString();
//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&publishedAfter=${startDateStr}&key=${API_KEY}&maxResults=50`;

//   try {
//     const response = await axios.get(url);
//     return response.data.items;
//   } catch (error) {
//     console.error('Error fetching data from YouTube API:', error);
//     return [];
//   }
// };

const api = {
  fetchYouTubeData,
  fetchSteamFollowers,
};

export default api;

// const fetchYouTubeData = async (query, days) => {
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - days);
//   const startDateStr = startDate.toISOString();

//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&publishedAfter=${startDateStr}&key=${API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     const totalResults = response.data.pageInfo.totalResults;

//     // Logic to keep fetching pages until you reach all results
//     let allVideos = [...response.data.items];
//     let nextPageToken = response.data.nextPageToken;

//     while (nextPageToken) {
//       const nextPageResponse = await axios.get(
//         `${url}&pageToken=${nextPageToken}`
//       );
//       allVideos = [...allVideos, ...nextPageResponse.data.items];
//       console.log(allVideos);
//       nextPageToken = nextPageResponse.data.nextPageToken;
//     }

//     return { videos: allVideos, totalMentions: totalResults };
//   } catch (error) {
//     console.error('Error fetching data from YouTube API:', error);
//     return { videos: [], totalMentions: 0 };
//   }
// };

// const fetchYouTubeData = async (query, days) => {
//   const today = new Date();
//   const startDate = new Date(today.setDate(today.getDate() - days));
//   const startDateStr = startDate.toISOString();
//   console.log(startDateStr);
//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&publishedAfter=${startDateStr}&key=${API_KEY}&maxResults=50`;

//   try {
//     const response = await axios.get(url);
//     return response.data.items;
//   } catch (error) {
//     console.error('Error fetching data from YouTube API:', error);
//     return [];
//   }
// };

// import axios from 'axios';

// const fetchMentions = async (gameName, startDate, endDate) => {
//   const url = `https://api.twitter.com/2/tweets/search/recent`;

//   const params = {
//     query: gameName,
//     start_time: startDate,
//     end_time: endDate,
//     max_results: 100,
//     'tweet.fields': 'author_id,created_at,text',
//     expansions: 'author_id',
//   };

//   const config = {
//     headers: {
//       Authorization: `{process.env.REACT_APP_TWIT_API_KEY}`,
//     },
//     params: params,
//   };

//   try {
//     const response = await axios.get(url, config);
//     const data = response.data;
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching data from Twitter API:', error);
//   }
// };

// const api = {
//   fetchMentions,
// };

// export default api;
