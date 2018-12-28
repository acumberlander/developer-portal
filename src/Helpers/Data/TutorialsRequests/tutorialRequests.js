import axios from 'axios';
import apiKeys from '../../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getTutorialsRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/tutorials.json`)
    .then((res) => {
      console.log('get Request data:', res);
      const tutorials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tutorials.push(res.data[key]);
        });
      }
      resolve(tutorials);
      console.log(tutorials);
    })
    .catch(err => reject(err));
});

const deleteTutorial = tutorialId => axios.delete(`${firebaseUrl}/tutorials/${tutorialId}.json`);

const postTutorialRequest = tutorial => axios.post(`${firebaseUrl}/tutorials.json`, tutorial);

const getSingleTutorial = tutorialId => axios.get(`${firebaseUrl}/tutorials/${tutorialId}.json`);

const putTutorialRequest = (tutorialId, tutorial) => axios.put(`${firebaseUrl}/tutorials/${tutorialId}.json`, tutorial);

export default {
  getTutorialsRequest,
  deleteTutorial,
  postTutorialRequest,
  getSingleTutorial,
  putTutorialRequest,
};
