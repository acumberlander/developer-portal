import PropTypes from 'prop-types';

const listingShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});


export default listingShape;
