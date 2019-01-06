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
import './singleBlog.scss';

class SingleBlog extends React.Component {
  static propTypes = {
    blog: listingShape,
    deleteSingleListing: PropTypes.func,
    passBlogToEdit: PropTypes.func,
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

  render() {
    const { blog } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (blog.uid === uid) {
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
      <li className="single-blog text-center">
        <span className="col-4">{blog.title}</span>
        <span className="col-3">{blog.link}</span>
        {makeButtons()}
        <span className="col-1">
          <Form>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" id="blogStatus"/>
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

export default SingleBlog;
