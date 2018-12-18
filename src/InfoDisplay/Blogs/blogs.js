import React from 'react';
import PropTypes from 'prop-types';
import listingShape from '../../Helpers/Data/propz/listingShape';
import SingleBlog from '../../SingleBlog/singleBlog';
import './blogs.scss';

class Blogs extends React.Component {
  // this defines what type these property values should be
  static propTypes = {
    blogs: PropTypes.arrayOf(listingShape),
    deleteSingleListing: PropTypes.func,
  }

  render() {
    const { blogs, deleteSingleListing } = this.props;
    const blogItemComponents = blogs.map(blog => (
      <SingleBlog
        tutorial={blog}
        key={blog.id}
        deleteSingleListing={deleteSingleListing}
        />
    ));
    return (
      <div className="display-items col">
        <h2>Blogs</h2>
        <ul>{blogItemComponents}</ul>
      </div>
    );
  }
}

export default Blogs;
