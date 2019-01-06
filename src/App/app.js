import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';

import connection from '../Helpers/Data/connection';

import Auth from '../components/Auth/auth';
import Tutorials from '../components/InfoDisplay/Tutorials/tutorials';
import Blogs from '../components/InfoDisplay/Blogs/blogs';
import Podcasts from '../components/InfoDisplay/Podcasts/podcasts';
import Resources from '../components/InfoDisplay/Resources/resources';
import Form from '../components/Form/form';
import MyNavbar from '../components/MyNavbar/myNavbar';
import Profile from '../components/Profile/profile';
import githubData from '../Helpers/Data/githubData';
import tutorialRequests from '../Helpers/Data/TutorialsRequests/tutorialRequests';
import blogRequests from '../Helpers/Data/BlogsRequests/blogsRequests';
import podcastRequests from '../Helpers/Data/PodcastsRequests/podcastsRequests';
import resourceRequests from '../Helpers/Data/ResourcesRequests/resourcesRequests';

import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Bio from '../components/Bio/bio';
import authRequests from '../Helpers/Data/authRequests';


class App extends Component {
  state = {
    authed: false,
    github_username: '',
    githubToken: '',
    commitcount: 0,
    tutorials: [],
    blogs: [],
    resources: [],
    podcasts: [],
    profile: [],
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  getGitHubData = (users, gitHubTokenStorage) => {
    githubData.getUser(gitHubTokenStorage)
      .then((profile) => {
        this.setState({ profile });
      });
    githubData.getUserEvent(users, gitHubTokenStorage)
      .then((commitcount) => {
        this.setState({ commitcount });
      })
      .catch(err => console.error('error with github user events GET', err));
  }
  // ----------------------------------COMPONENT DATA REQUESTS------------------------------//

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const users = sessionStorage.getItem('githubUsername');
        const gitHubTokenStorage = sessionStorage.getItem('githubToken');
        this.getGitHubData(users, gitHubTokenStorage);
      } else {
        this.setState({
          authed: false,
        });
      }
    });

    tutorialRequests.getTutorialsRequest()
      .then((tutorials) => {
        this.setState({ tutorials });
      })
      .catch(err => console.error('error with listing GET', err));

    blogRequests.getBlogsRequest()
      .then((blogs) => {
        this.setState({ blogs });
      })
      .catch(err => console.error('error with listing GET', err));

    podcastRequests.getPodcastsRequest()
      .then((podcasts) => {
        this.setState({ podcasts });
      })
      .catch(err => console.error('error with listing GET', err));

    resourceRequests.getResourcesRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with listing GET', err));
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (username, accessToken) => {
    this.setState({
      authed: true,
      github_username: username,
      githubToken: accessToken,
    });
    sessionStorage.setItem('github_username', username);
    sessionStorage.setItem('githubtoken', accessToken);
  }

  // --------------------------------------------- DELETE FUNCTIONS ------------------------------//

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

  // ----------------------------------- FORM SUBMIT FUNCTIONS -------------------------------//


  tutorialFormSubmitEvent = (newListing, tab) => {
    if (tab === 'tutorials') {
      tutorialRequests.postTutorialRequest(newListing)
        .then(() => {
          tutorialRequests.getTutorialsRequest()
            .then((tutorials) => {
              this.setState({ tutorials });
            });
        })
        .catch(err => console.error('error with tutorials post', err));
    } else if (tab === 'blogs') {
      blogRequests.postBlogRequest(newListing)
        .then(() => {
          blogRequests.getTutorialRequest()
            .then((blogs) => {
              this.setState({ blogs });
            });
        })
        .catch(err => console.error('error with blogs post', err));
    } else if (tab === 'podcasts') {
      podcastRequests.postPodcastRequest(newListing)
        .then(() => {
          podcastRequests.getPodcastsRequest()
            .then((podcasts) => {
              this.setState({ podcasts });
            });
        })
        .catch(err => console.error('error with podcast post', err));
    } else if (tab === 'resources') {
      resourceRequests.postResourceRequest(newListing)
        .then(() => {
          resourceRequests.getResourceRequest()
            .then((resources) => {
              this.setState({ resources });
            });
        })
        .catch(err => console.error('error with podcast post', err));
    }
  };


  // resourceFormSubmitEvent = (newResource) => {
  //   const { isEditing, editId } = this.state;
  //   if (isEditing) {
  //     resourceRequests.putResourceRequest(editId, newResource)
  //       .then(() => {
  //         resourceRequests.getResourcesRequest()
  //           .then((resources) => {
  //             this.setState({ resources, isEditing: false, editId: '-1' });
  //           });
  //       })
  //       .catch(err => console.error('error with resources post', err));
  //   } else {
  //     resourceRequests.postResourceRequest(newResource)
  //       .then(() => {
  //         resourceRequests.getResourcesRequest()
  //           .then((resources) => {
  //             this.setState({ resources });
  //           });
  //       })
  //       .catch(err => console.error('error with resources post', err));
  //   }
  // };

  // ------------------------------- PASS TO EDIT FUNCTIONS -------------------------------//

  passTutorialToEdit = tutorialId => this.setState({ isEditing: true, editId: tutorialId });

  passBlogToEdit = blogId => this.setState({ isEditing: true, editId: blogId });

  passPodcastToEdit = podcastId => this.setState({ isEditing: true, editId: podcastId });

  passResourceToEdit = resourceId => this.setState({ isEditing: true, editId: resourceId });

  // ---------------------------------- RENDER FUNCTION ----------------------//

  render() {
    const {
      authed,
      isEditing,
      editId,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      sessionStorage.clear();
      this.setState({
        authed: false,
        gitHubUsername: '',
        githubToken: '',
      });
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
      <div className="wrapper">
      <div className="profile">
      { authed && <Profile profile={this.state.profile} commitcount={this.state.commitcount} /> }
      </div>
      <div className="form">
        <Form
        onSubmit={this.formSubmitEvent}
        isEditing={isEditing}
        editId={editId}
        />
      </div>
      <div className="tab">
        <Nav tabs>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
            Tutorial
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
            Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
            Podcasts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => {
                this.toggle('4');
              }}
            >
            Resources
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Tutorials
              tutorials={this.state.tutorials}
              deleteSingleTutorial={this.deleteOneTutorial}
            />
          </TabPane>
          <TabPane tabId="2">
            <Blogs
              blogs={this.state.blogs}
              deleteSingleBlog={this.deleteOneBlog}
            />
          </TabPane>
          <TabPane tabId="3">
            <Podcasts
              podcasts={this.state.podcasts}
              deleteSinglePodcast={this.deleteOnePodcast}
            />
          </TabPane>
          <TabPane tabId="4">
            <Resources
              resources={this.state.resources}
              deleteSingleResource={this.deleteSingleResource}
            />
          </TabPane>
        </TabContent>
        </div>
      </div>
    </div>
    );
  }
}


export default App;
