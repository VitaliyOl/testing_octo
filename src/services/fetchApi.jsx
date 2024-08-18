import axios from 'axios';

// reserv AIzaSyCDeWup16YF1kUi965hj0FwZIU-z2C88uU
//reserv AIzaSyA7FNWkfKhiXr4j7uw66tz2uzrYt0BYwIk
//reserv AIzaSyB9MAoPbhMDg4suczSKXGjfUxof17HQads
//AIzaSyCeX0yW0phRI-Blvpdql_msZQUctqSelP8
//AIzaSyB9MAoPbhMDg4suczSKXGjfUxof17HQads
//AIzaSyCeX0yW0phRI-Blvpdql_msZQUctqSelP8

const API_KEY = 'AIzaSyAiP59ZNGLiaqDfk2sygOjSD_88cFgq7xg';

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
//       Authorization: `AAAAAAAAAAAAAAAAAAAAAFMavQEAAAAACguGizOnJniD1%2B%2BgrdpSFS2qS%2Fc%3D1mXTpGkq5NBA8a3VEhCWLudD8IZvumdcUQ1gvPgbXHlAKovqQG`,
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
