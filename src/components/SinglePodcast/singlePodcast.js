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
import './singlePodcast.scss';

class SinglePodcast extends React.Component {
  static propTypes = {
    podcast: listingShape,
    deleteSingleListing: PropTypes.func,
    passPodcastToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, podcast } = this.props;
    deleteSingleListing(podcast.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passPodcastToEdit, podcast } = this.props;
    passPodcastToEdit(podcast.id);
  }

  render() {
    const { podcast } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (podcast.uid === uid) {
        console.log(podcast.uid);
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
      <li className="single-podcast text-center">
        <span className="col-4">{podcast.title}</span>
        <span className="col-3">{podcast.link}</span>
        {makeButtons()}
        <span className="col-1">
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="podcastStatus"/>
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

export default SinglePodcast;
