import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../Helpers/Data/connection';

import Auth from '../components/Auth/auth';
import Tutorials from '../InfoDisplay/Tutorials/tutorials';
import Form from '../Form/form';
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

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row">
        <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      </div>
      );
    }
    return (
      <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row">
          <Tutorials
            tutorials={this.state.tutorials}
            deleteSingleListing={this.deleteOne}
          />
        <Bio />
        </div>
        <div className="row">
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
