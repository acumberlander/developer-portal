import React from 'react';
import PropTypes from 'prop-types';
import './Auth.scss';
import authRequests from '../../Helpers/Data/authRequests';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

authenticateUser = (e) => {
  e.preventDefault();
  authRequests.authenticate().then((result) => {
    const user = result.additionalUserInfo.username;
    this.props.isAuthenticated(user);
  }).catch(error => console.error('error with auth', error));
}

render() {
  return (
    <div className="Auth">
      <button className="btn btn-danger" onClick={this.authenticateUser}>Login</button>
    </div>
  );
}
}


export default Auth;
