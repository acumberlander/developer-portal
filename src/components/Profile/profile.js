import React from 'react';
import './Profile.scss';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  static propType = {
    githubCommits: PropTypes.string,
    githubProfileLink: PropTypes.string,
    githubProfilePic: PropTypes.string,
    githubUsername: PropTypes.string,
  }

  render() {
    const {
      githubCommits,
      githubProfileLink,
      githubProfilePic,
      githubUsername,
    } = this.props;
    return (
      <div className="profile p-4">
        <img className="profileImage mb-2" src={githubProfilePic} alt="github profile pic"/>
        <h3 className="mb-2">{githubUsername}</h3>
        <a href={githubProfileLink}>Github Profile Link</a>
        <h3 className="mt-2">{githubCommits} Commits</h3>
        <h5>in the last 5 days</h5>
      </div>
    );
  }
}

export default Profile;
