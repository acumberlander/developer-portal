import axios from 'axios';
import apiKeys from '../apiKeys';

const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;

const getGithubProfile = githubUsername => new Promise((resolve, reject) => {
  axios.get(`https://api.github.com/users/${githubUsername}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

const getGithubCommits = githubUsername => new Promise((resolve, reject) => {
  axios.get(`https://api.github.com/users/${githubUsername}/events/public`)
    .then((result) => {
      let numberOfCommits = 0;
      const filteredEvents = result.data.filter(event => event.type === 'PushEvent');
      filteredEvents.forEach((event) => {
        numberOfCommits += event.payload.commits.length;
      });
      resolve(numberOfCommits);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getGithubProfile,
  getGithubCommits,
};
