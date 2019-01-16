import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import tabDataShape from '../../Helpers/Data/propz/listingShape';
import './SingleResource.scss';

class SingleResource extends React.Component {
  static propTypes = {
    resource: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, resource } = this.props;
    deleteTabItem(resource.id, 'resources');
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTabItemToEdit, resource } = this.props;
    passTabItemToEdit(resource.id, 'resources');
  }

  updateIsCompleted = (e) => {
    const { resource, updateSingleIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateSingleIsCompleted(resource.id, isCompleted, 'resources');
  }


  render() {
    const { resource } = this.props;
    return (
      <div className="resource-item row">
        <span className="col-4">{resource.name}</span>
        <span className="col-4"><a href={resource.url}>Link</a></span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.editEvent}><i className="far fa-edit"/></button>
        </span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
        </span>
        <span className="col-2">
          <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={resource.isCompleted} onChange={this.updateIsCompleted}/>{' '}
                Done
                </Label>
          </FormGroup>
        </span>
      </div>
    );
  }
}

export default SingleResource;
