import React from 'react';
import PropTypes from 'prop-types';
import './auth.scss';
import authRequests from '../../Helpers/Data/authRequests';

class auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate()
      .then((res) => {
        const user = res.additionalUserInfo.username;
        console.log(res);
        this.props.isAuthenticated(user);
      })
      .catch(error => console.error('there was an error with auth', error));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-danger" onClick={this.authenticateUser}>Login</button>
      </div>
    );
  }
}

export default auth;
