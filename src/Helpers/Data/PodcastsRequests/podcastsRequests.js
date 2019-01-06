import axios from 'axios';
import apiKeys from '../../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getPodcastsRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/podcasts.json`)
    .then((res) => {
      console.log('get Request data:', res);
      const podcasts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          podcasts.push(res.data[key]);
        });
      }
      resolve(podcasts);
      console.log(podcasts);
    })
    .catch(err => reject(err));
});

const deletePodcast = podcastId => axios.delete(`${firebaseUrl}/podcasts/${podcastId}.json`);

const postPodcastRequest = podcast => axios.post(`${firebaseUrl}/podcasts.json`, podcast);

const getSinglePodcast = podcastId => axios.get(`${firebaseUrl}/podcasts/${podcastId}.json`);

const putPodcastRequest = (podcastId, podcast) => axios.put(`${firebaseUrl}/podcasts/${podcastId}.json`, podcast);

export default {
  getPodcastsRequest,
  deletePodcast,
  postPodcastRequest,
  getSinglePodcast,
  putPodcastRequest,
};
