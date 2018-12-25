import React from 'react';
import './tutorialForm.scss';
import PropTypes from 'prop-types';
import tutorialRequests from '../../Helpers/Data/tutorialRequests';
import authRequests from '../../Helpers/Data/authRequests';


const defaultTutorial = {
  title: '',
  link: '',
  uid: '',
};

class TutorialForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isEditing: PropTypes.bool,
    editId: PropTypes.string,
  }

  state = {
    newTutorial: defaultTutorial,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempTutorial = { ...this.state.newTutorial };
    tempTutorial[name] = e.target.value;
    this.setState({ newTutorial: tempTutorial });
  }

  // formFieldNumberState = (name, e) => {
  //   const tempListing = { ...this.state.newListing };
  //   tempListing[name] = e.target.value * 1;
  //   this.setState({ newListing: tempListing });
  // }

  titleChange = e => this.formFieldStringState('title', e);

  linkChange = e => this.formFieldStringState('link', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myTutorial = { ...this.state.newTutorial };
    myTutorial.uid = authRequests.getCurrentUid();
    onSubmit(myTutorial);
    this.setState({ newTutorial: defaultTutorial });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      // this promise is returning null instead of an object. This why edit feature is broken
      tutorialRequests.getSingleTutorial(editId)
        .then((tutorial) => {
          console.log('Right here!', tutorial);
          this.setState({ newTutorial: tutorial.data });
        })
        .catch(err => console.error('error when getSingleTutorial', err));
    }
  }

  render() {
    const { newTutorial } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Tutorial:</h2>;
      }
      return <h2>Add New Tutorial:</h2>;
    };
    return (
      <div className="tutorial-form col">
      {title()}
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <div className="tutorial-title d-flex">
              <label htmlFor="title">Title</label>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby=""
                placeholder="Learn Javascript in 30 Days..."
                value={newTutorial.title}
                onChange={this.titleChange}
              />
              <div className="tutorial-link d-flex">
                <label htmlFor="link">Link</label>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="link"
                aria-describedby=""
                placeholder="javascript30.com"
                value={newTutorial.link}
                onChange={this.linkChange}
              />
            </div>
          </div>
          <button className="btn btn-danger">
            Save Tutorial
          </button>
        </form>
      </div>
    );
  }
}

export default TutorialForm;
