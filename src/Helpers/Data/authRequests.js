import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  console.log('This gitHub info:', provider);
  return firebase.auth().signInWithPopup(provider);
};

const getGitHubInfo = (resolve, reject) => {
  authenticate()
    .then((res) => {
      const user = res.additionalUserInfo.username;
      resolve(user);
      reject(err => console.error('error with GET github info', err));
    })
    .catch(err => console.error('error with gitHub profile info:', err));
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;


export default {
  authenticate,
  logoutUser,
  getCurrentUid,
  getGitHubInfo,
};
