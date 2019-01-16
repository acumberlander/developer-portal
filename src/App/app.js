import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import GithubProfile from '../components/Profile/Profile';
import TabList from '../components/TabList/TabList';
import connection from '../Helpers/Data/connection';
import authRequests from '../Helpers/Data/authRequests';
import githubApiRequests from '../Helpers/Data/githubData';
import tabDataRequests from '../Helpers/Data/tabDataRequests';
import TabForm from '../components/Form/Form';

class App extends Component {
  state = {
    authed: false,
    githubUsername: '',
    tutorials: [],
    podcasts: [],
    resources: [],
    blogs: [],
    isEditing: false,
    editId: '-1',
    tabType: '',
    githubProfileLink: '',
    githubProfilePic: '',
    githubCommits: 0,
  };

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
        const githubUser = this.state.githubUsername;
        githubApiRequests.getGithubProfile(githubUser)
          .then((githubData) => {
            const githubProfileLink = githubData.html_url;
            const githubCommits = githubData.x;
            const githubProfilePic = githubData.avatar_url;
            this.setState({ githubProfileLink, githubCommits, githubProfilePic });
          })
          .catch((error) => {
            console.error(error);
          });

        githubApiRequests.getGithubCommits(githubUser)
          .then((githubCommits) => {
            this.setState({ githubCommits });
          })
          .catch((error) => {
            console.error(error);
          });

        const currentUser = authRequests.getCurrentUid();

        tabDataRequests.getRequest(currentUser, 'tutorials')
          .then((tutorials) => {
            console.log(tutorials);
            this.setState({ tutorials });
          });

        tabDataRequests.getRequest(currentUser, 'podcasts')
          .then((podcasts) => {
            this.setState({ podcasts });
          });

        tabDataRequests.getRequest(currentUser, 'blogs')
          .then((blogs) => {
            this.setState({ blogs });
          });

        tabDataRequests.getRequest(currentUser, 'resources')
          .then((resources) => {
            this.setState({ resources });
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
    this.setState({
      authed: true,
      githubUsername: username,
    });
  }

  deleteTabItem = (tabId, tabType) => {
    const uid = authRequests.getCurrentUid();
    tabDataRequests.deleteRequest(tabId, tabType)
      .then(() => {
        tabDataRequests.getRequest(uid, tabType)
          .then((tabItems) => {
            if (tabType === 'tutorials') {
              this.setState({ tutorials: tabItems });
            } else if (tabType === 'podcasts') {
              this.setState({ podcasts: tabItems });
            } else if (tabType === 'blogs') {
              this.setState({ blogs: tabItems });
            } else if (tabType === 'resources') {
              this.setState({ resources: tabItems });
            }
          });
      })
      .catch((error) => {
        console.error('error on formSubmitEvent', error);
      });
  }

  formSubmitEvent = (newTabItem, tabType) => {
    const uid = authRequests.getCurrentUid();
    const { isEditing, editId } = this.state;
    if (isEditing && tabType !== '') {
      tabDataRequests.putRequest(editId, tabType, newTabItem)
        .then(() => {
          tabDataRequests.getRequest(uid, tabType)
            .then((tabItems) => {
              if (tabType === 'tutorials') {
                this.setState({ tutorials: tabItems });
              } else if (tabType === 'podcasts') {
                this.setState({ podcasts: tabItems });
              } else if (tabType === 'blogs') {
                this.setState({ blogs: tabItems });
              } else if (tabType === 'resources') {
                this.setState({ resources: tabItems });
              }
            });
          this.setState({ isEditing: false, editId: -1 });
        })
        .catch((error) => {
          console.error('error on formSubmitEvent', error);
        });
    } else if (tabType !== '') {
      tabDataRequests.postRequest(newTabItem, tabType)
        .then(() => {
          tabDataRequests.getRequest(uid, tabType)
            .then((tabItems) => {
              if (tabType === 'tutorials') {
                this.setState({ tutorials: tabItems });
              } else if (tabType === 'podcasts') {
                this.setState({ podcasts: tabItems });
              } else if (tabType === 'blogs') {
                this.setState({ blogs: tabItems });
              } else if (tabType === 'resources') {
                this.setState({ resources: tabItems });
              }
            });
        })
        .catch((error) => {
          console.error('error on formSubmitEvent', error);
        });
    } else {
      alert('no tab type has been selected');
    }
  }

  passTabItemToEdit = (tabId, tabType) => {
    this.setState({ isEditing: true, editId: tabId, tabType });
  }

  updateSingleIsCompleted= (itemId, isCompleted, tabType) => {
    const uid = authRequests.getCurrentUid();
    tabDataRequests.updateItemIsCompleted(itemId, isCompleted, tabType)
      .then(() => {
        tabDataRequests.getRequest(uid, tabType)
          .then((tabItems) => {
            if (tabType === 'tutorials') {
              tabItems.sort((x, y) => x.isCompleted - y.isCompleted);
              this.setState({ tutorials: tabItems });
            } else if (tabType === 'podcasts') {
              tabItems.sort((x, y) => x.isCompleted - y.isCompleted);
              this.setState({ podcasts: tabItems });
            } else if (tabType === 'blogs') {
              tabItems.sort((x, y) => x.isCompleted - y.isCompleted);
              this.setState({ blogs: tabItems });
            } else if (tabType === 'resources') {
              tabItems.sort((x, y) => x.isCompleted - y.isCompleted);
              this.setState({ resources: tabItems });
            }
          });
      })
      .catch((error) => {
        console.error('error on updateSingleIsCompleted', error);
      });
  }

  render() {
    const {
      authed,
      podcasts,
      tutorials,
      blogs,
      resources,
      editId,
      isEditing,
      tabType,
      githubCommits,
      githubProfileLink,
      githubProfilePic,
      githubUsername,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, githubUsername: '' });
    };

    if (!authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
      <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
      <div className="row mt-4">
      <div className="col-4 ml-5">
      <GithubProfile
        githubCommits={githubCommits}
        githubProfileLink={githubProfileLink}
        githubProfilePic={githubProfilePic}
        githubUsername={githubUsername}
      />
      </div>
      <div className="col-7 ml-5">
      <TabForm
        onSubmit={this.formSubmitEvent}
        isEditing={isEditing}
        editId={editId}
        tabType={tabType}
      />
      <TabList
        tutorials={tutorials}
        podcasts={podcasts}
        blogs={blogs}
        resources={resources}
        deleteTabItem={this.deleteTabItem}
        passTabItemToEdit={this.passTabItemToEdit}
        updateSingleIsCompleted={this.updateSingleIsCompleted}
      />
      </div>
      </div>
    </div>
    );
  }
}

export default App;
