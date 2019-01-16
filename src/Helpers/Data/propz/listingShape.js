import PropTypes from 'prop-types';

const listingShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});


export default listingShape;
