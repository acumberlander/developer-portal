import axios from 'axios';
import apiKeys from '../../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getResourcesRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json`)
    .then((res) => {
      console.log('get Request data:', res);
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
      console.log(resources);
    })
    .catch(err => reject(err));
});

const deleteResource = resourceId => axios.delete(`${firebaseUrl}/resources/${resourceId}.json`);

const postResoureRequest = resource => axios.post(`${firebaseUrl}/resources.json`, resource);

const getSingleResource = resourceId => axios.get(`${firebaseUrl}/resources/${resourceId}.json`);

const putResourceRequest = (resourceId, resource) => axios.put(`${firebaseUrl}/resources/${resourceId}.json`, resource);

export default {
  getResourcesRequest,
  deleteResource,
  postResoureRequest,
  getSingleResource,
  putResourceRequest,
};
