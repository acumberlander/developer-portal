import React from 'react';
import PropTypes from 'prop-types';
import listingShape from '../../../Helpers/Data/propz/listingShape';
import SingleBlog from '../../SingleBlog/SingleBlog';
import './Blogs.scss';

class Blogs extends React.Component {
  // this defines what type these property values should be
  static propType = {
    blogs: PropTypes.arrayOf(listingShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  render() {
    const {
      blogs,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    const blogsItemComponents = blogs.map(blog => (
      <SingleBlog
        blog={blog}
        key={blog.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
        updateSingleIsCompleted={updateSingleIsCompleted}
      />
    ));
    return (
      <div className="blogs mt-4">
        <ul>{blogsItemComponents}</ul>
      </div>
    );
  }
}

export default Blogs;
