import firebase from 'firebase/app';
import 'firebase/auth';

const authenticate = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(provider);
  // .then((result) => {
  //   // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  //   const token = result.credential.accessToken;
  //   console.log(token);
  //   // The signed-in user info.
  //   const gitHubUser = result.user;
  //   console.log(gitHubUser);
  //   // ...
  // }).catch((error) => {
  //   // Handle Errors here.
  //   const errorCode = error.code;
  //   console.log(errorCode);
  //   const errorMessage = error.message;
  //   console.log(errorMessage);
  //   // The email of the user's account used.
  //   const gitEmail = error.email;
  //   console.log(gitEmail);
  //   // The firebase.auth.AuthCredential type that was used.
  //   const gitCredential = error.credential;
  //   console.log(gitCredential);
  // });
};


const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;


export default {
  authenticate,
  logoutUser,
  getCurrentUid,
};
