import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

import listingShape from '../Helpers/Data/propz/listingShape';
import authRequests from '../Helpers/Data/authRequests';

class SingleTutorial extends React.Component {
  static propTypes = {
    tutorial: listingShape,
    deleteSingleListing: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, tutorial } = this.props;
    deleteSingleListing(tutorial.id);
  }

  render() {
    const { tutorial } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (tutorial.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
            <Form>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" id="tutorialStatus"/>
                </Label>
              </FormGroup>
            </Form>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="listing-item text-center">
        <span className="col-7">{tutorial.title}</span>
        <span className="col-7">{tutorial.link}</span>
        {makeButtons()}
      </li>
    );
  }
}

export default SingleTutorial;
