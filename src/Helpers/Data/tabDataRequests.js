import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = (uid, tabType) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/${tabType}.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const tabData = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tabData.push(res.data[key]);
        });
      }
      resolve(tabData);
    })
    .catch((error) => {
      reject(error);
    });
});

const updateItemIsCompleted = (itemId, isCompleted, tabType) => axios.patch(`${firebaseUrl}/${tabType}/${itemId}.json`, { isCompleted });

const postRequest = (tabItem, tabType) => axios.post(`${firebaseUrl}/${tabType}.json`, tabItem);

const deleteRequest = (tabId, tabType) => axios.delete(`${firebaseUrl}/${tabType}/${tabId}.json`);

const getSingleTabItem = (tabId, tabType) => axios.get(`${firebaseUrl}/${tabType}/${tabId}.json`);

const putRequest = (tabId, tabType, newTabItem) => axios.put(`${firebaseUrl}/${tabType}/${tabId}.json`, newTabItem);

export default {
  getRequest,
  postRequest,
  deleteRequest,
  getSingleTabItem,
  putRequest,
  updateItemIsCompleted,
};
