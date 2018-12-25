import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import listingShape from '../../Helpers/Data/propz/listingShape';
import authRequests from '../../Helpers/Data/authRequests';
import './singleTutorial.scss';

class SingleTutorial extends React.Component {
  static propTypes = {
    tutorial: listingShape,
    deleteSingleListing: PropTypes.func,
    passTutorialToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, tutorial } = this.props;
    deleteSingleListing(tutorial.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTutorialToEdit, tutorial } = this.props;
    passTutorialToEdit(tutorial.id);
  }

  render() {
    const { tutorial } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (tutorial.uid === uid) {
        console.log(tutorial.uid);
        console.log(uid);
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </span>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="single-tutorial text-center">
        <span className="col-4">{tutorial.title}</span>
        <span className="col-3">{tutorial.link}</span>
        {makeButtons()}
        <span className="col-1">
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="tutorialStatus"/>
              </Label>
            </FormGroup>
          </Form>
        </span>
        <span>
        "Done!"
        </span>
      </li>
    );
  }
}

export default SingleTutorial;
