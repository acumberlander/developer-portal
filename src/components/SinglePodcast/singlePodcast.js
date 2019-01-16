import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import tabDataShape from '../../Helpers/Data/propz/listingShape';
import './SinglePodcast.scss';

class PodcastItem extends React.Component {
  static propTypes = {
    podcast: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, podcast } = this.props;
    deleteTabItem(podcast.id, 'podcasts');
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTabItemToEdit, podcast } = this.props;
    passTabItemToEdit(podcast.id, 'podcasts');
  }

  updateIsCompleted = (e) => {
    const { podcast, updateSingleIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateSingleIsCompleted(podcast.id, isCompleted, 'podcasts');
  }


  render() {
    const { podcast } = this.props;
    return (
      <div className="podcast-item row">
        <span className="col-4">{podcast.name}</span>
        <span className="col-4"><a href={podcast.url}>Link</a></span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.editEvent}><i className="far fa-edit"/></button>
        </span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
        </span>
        <span className="col-2">
        <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={podcast.isCompleted} onChange={this.updateIsCompleted}/>{' '}
                Done
                </Label>
          </FormGroup>
        </span>
      </div>
    );
  }
}

export default PodcastItem;
