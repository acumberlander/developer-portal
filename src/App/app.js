import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
// import {
//   Tabs,
//   Tab,
//   TabList,
//   TabPanel,
// }
//   from 'react-tabs';

import connection from '../Helpers/Data/connection';

import Auth from '../components/Auth/auth';
import Tutorials from '../InfoDisplay/Tutorials/tutorials';
import TutorialForm from '../Form/tutorialForm';
import MyNavbar from '../MyNavbar/myNavbar';

import tutorialRequests from '../Helpers/Data/tutorialRequests';

import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bio from '../Bio/bio';
import authRequests from '../Helpers/Data/authRequests';


class App extends Component {
  state = {
    authed: false,
    github_username: '',
    tutorials: {},
    blogs: {},
    resources: {},
    podcasts: {},
    editId: '-1',
    isEditing: false,
  }

  componentDidMount() {
    connection();
    tutorialRequests.getRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('error with listing GET', err));

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (username) => {
    this.setState({ authed: true, github_username: username });
  }

  deleteOne = (tutorialId) => {
    tutorialRequests.deleteTutorial(tutorialId)
      .then(() => {
        tutorialRequests.getRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitEvent = (newTutorial) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      tutorialRequests.putRequest(editId, newTutorial)
        .then(() => {
          tutorialRequests.getRequest()
            .then((tutorials) => {
              this.setState({ tutorials, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    } else {
      tutorialRequests.postRequest(newTutorial)
        .then(() => {
          tutorialRequests.getRequest()
            .then((tutorials) => {
              this.setState({ tutorials });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    }
  };

  passTutorialToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });

  render() {
    const {
      authed,
      tutorials,
      isEditing,
      editId,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!authed) {
      return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row">
        <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
        <div className="tabs m-3">
          <span>
            <button className="btn btn-secondary m-1" id="tutorialTab">
              Tutorials
            </button>
          </span>
          <span>
            <button className="btn btn-secondary m-1" id="blogTab">
              Blogs
            </button>
          </span>
          <span>
            <button className="btn btn-secondary m-1" id="resourceTab">
              Resources
            </button>
          </span>
          <span>
            <button className="btn btn-secondary m-1" id="podcastTab">
              Podcasts
            </button>
          </span>
        </div>
        <div className="row">
          <Tutorials
            tutorials={tutorials}
            deleteSingleListing={this.deleteOne}
            passTutorialToEdit={this.passTutorialToEdit}
          />
        <Bio />
        </div>
        <div className="col">
          <TutorialForm
          onSubmit={this.formSubmitEvent}
          isEditing={isEditing}
          editId={editId}
          />
        </div>
      </div>
    );
  }
}

export default App;
