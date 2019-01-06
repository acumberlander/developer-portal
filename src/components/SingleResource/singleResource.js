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
import './singleResource.scss';

class SingleResource extends React.Component {
  static propTypes = {
    resource: listingShape,
    deleteSingleListing: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, resource } = this.props;
    deleteSingleListing(resource.id);
  }

  render() {
    const { resource } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (resource.uid === uid) {
        return (
          <div>
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
      <li className="single-resource text-center">
        <span className="col-4">{resource.title}</span>
        <span className="col-3">{resource.link}</span>
        {makeButtons()}
        <span className="col-1">
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="resourceStatus"/>
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

export default SingleResource;
