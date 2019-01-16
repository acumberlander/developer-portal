import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import listingShape from '../../Helpers/Data/propz/listingShape';
import './SingleBlog.scss';

class SingleBlog extends React.Component {
  static propTypes = {
    blog: listingShape,
    deleteSingleListing: PropTypes.func,
    passBlogToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleListing, blog } = this.props;
    deleteSingleListing(blog.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passBlogToEdit, blog } = this.props;
    passBlogToEdit(blog.id);
  }

  updateIsCompleted = (e) => {
    const { blog, updateSingleIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateSingleIsCompleted(blog.id, isCompleted, 'blogs');
  }

  render() {
    const { blog } = this.props;
    return (
      <div className="blog-item row">
        <span className="col-4">{blog.name}</span>
        <span className="col-4"><a href={blog.url}>Link</a></span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.editEvent}><i className="far fa-edit"/></button>
        </span>
        <span className="col-1">
          <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
        </span>
        <span className="col-2">
          <FormGroup check>
            <Label check>
              <Input type="checkbox" checked={blog.isCompleted} onChange={this.updateIsCompleted}/>{' '}
            Done
            </Label>
          </FormGroup>
        </span>
      </div>
    );
  }
}

export default SingleBlog;
