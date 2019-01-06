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
import Tutorials from '../components/InfoDisplay/Tutorials/tutorials';
import Blogs from '../components/InfoDisplay/Blogs/blogs';
import TutorialForm from '../components/Forms/TutorialsForm/tutorialForm';
import MyNavbar from '../components/MyNavbar/myNavbar';

import tutorialRequests from '../Helpers/Data/TutorialsRequests/tutorialRequests';
import blogRequests from '../Helpers/Data/BlogsRequests/blogsRequests';
import podcastRequests from '../Helpers/Data/PodcastsRequests/podcastsRequests';
import resourceRequests from '../Helpers/Data/ResourcesRequests/resourcesRequests';

import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bio from '../components/Bio/bio';
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

  // ----------------------------------------------------------COMPONENT DATA REQUESTS-----------------------------------------------------------------------

  componentDidMount() {
    connection();
    tutorialRequests.getTutorialsRequest()
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
    blogRequests.getBlogsRequest()
      .then((blogs) => {
        this.setState({ blogs });
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
    podcastRequests.getPodcastsRequest()
      .then((podcasts) => {
        this.setState({ podcasts });
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
    resourceRequests.getResourcesRequest()
      .then((resources) => {
        this.setState({ resources });
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

  // ---------------------------------------------------------- DELETE FUNCTIONS -----------------------------------------------------------------------

  deleteOneTutorial = (tutorialId) => {
    tutorialRequests.deleteTutorial(tutorialId)
      .then(() => {
        tutorialRequests.getTutorialsRequest()
          .then((tutorials) => {
            this.setState({ tutorials });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  deleteOneBlog = (blogId) => {
    blogRequests.deleteblog(blogId)
      .then(() => {
        blogRequests.getBlogsRequest()
          .then((blogs) => {
            this.setState({ blogs });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  deleteOnePodcast = (podcastId) => {
    podcastRequests.deletePodcast(podcastId)
      .then(() => {
        podcastRequests.getPodcastsRequest()
          .then((podcasts) => {
            this.setState({ podcasts });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  deleteOneResource = (resourceId) => {
    resourceRequests.deleteResource(resourceId)
      .then(() => {
        resourceRequests.getresourcesRequest()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  // ---------------------------------------------------------- FORM SUBMIT FUNCTIONS -----------------------------------------------------------------------


  tutorialFormSubmitEvent = (newTutorial) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      tutorialRequests.putTutorialRequest(editId, newTutorial)
        .then(() => {
          tutorialRequests.getTutorialsRequest()
            .then((tutorials) => {
              this.setState({ tutorials, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    } else {
      tutorialRequests.postTutorialRequest(newTutorial)
        .then(() => {
          tutorialRequests.getTutorialRequest()
            .then((tutorials) => {
              this.setState({ tutorials });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    }
  };

  blogFormSubmitEvent = (newBlog) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      blogRequests.putBlogRequest(editId, newBlog)
        .then(() => {
          blogRequests.getBlogsRequest()
            .then((blogs) => {
              this.setState({ blogs, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    } else {
      blogRequests.postBlogRequest(newBlog)
        .then(() => {
          blogRequests.getBlogsRequest()
            .then((blogs) => {
              this.setState({ blogs });
            });
        })
        .catch(err => console.error('error with blogs post', err));
    }
  };

  podcastFormSubmitEvent = (newPodcast) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      podcastRequests.putPodcastRequest(editId, newPodcast)
        .then(() => {
          podcastRequests.getPodcastsRequest()
            .then((podcasts) => {
              this.setState({ podcasts, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with podcasts post', err));
    } else {
      podcastRequests.postPodcastRequest(newPodcast)
        .then(() => {
          podcastRequests.getPodcastsRequest()
            .then((podcasts) => {
              this.setState({ podcasts });
            });
        })
        .catch(err => console.error('error with podcasts post', err));
    }
  };

  resourceFormSubmitEvent = (newResource) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      resourceRequests.putResourceRequest(editId, newResource)
        .then(() => {
          resourceRequests.getResourcesRequest()
            .then((resources) => {
              this.setState({ resources, isEditing: false, editId: '-1' });
            });
        })
        .catch(err => console.error('error with resources post', err));
    } else {
      resourceRequests.postResourceRequest(newResource)
        .then(() => {
          resourceRequests.getResourcesRequest()
            .then((resources) => {
              this.setState({ resources });
            });
        })
        .catch(err => console.error('error with resources post', err));
    }
  };

  // ---------------------------------------------------------- PASS TO EDIT FUNCTIONS -----------------------------------------------------------------------

  passTutorialToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });

  passBlogToEdit = blogId => this.setState({ isEditing: true, editId: blogId });

  passPodcastToEdit = podcastId => this.setState({ isEditing: true, editId: podcastId });

  passResourceToEdit = resourceId => this.setState({ isEditing: true, editId: resourceId });

  // ---------------------------------------------------------- RENDER FUNCTION -----------------------------------------------------------------------

  render() {
    const {
      authed,
      tutorials,
      blogs,
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

    const gitHubUsername = authRequests.getGitHubInfo();


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
            deleteSingleListing={this.deleteOneTutorial}
            passTutorialToEdit={this.passTutorialToEdit}
          />
          <Blogs
            blogs={blogs}
          />
        <Bio
          gitHubUsername={gitHubUsername}
        />
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
