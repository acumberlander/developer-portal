import React from 'react';
import PropTypes from 'prop-types';
import listingShape from '../../../Helpers/Data/propz/listingShape';
import SingleTutorial from '../../SingleTutorial/singleTutorial';
import './tutorials.scss';

class Tutorials extends React.Component {
  // this defines what type these property values should be
  static propTypes = {
    tutorials: PropTypes.arrayOf(listingShape),
    deleteSingleListing: PropTypes.func,
    passTutorialToEdit: PropTypes.func,
  }

  render() {
    const { tutorials, deleteSingleListing, passTutorialToEdit } = this.props;
    const tutorialItemComponents = tutorials.map(tutorial => (
      <SingleTutorial
        tutorial={tutorial}
        key={tutorial.id}
        deleteSingleListing={deleteSingleListing}
        passTutorialToEdit={passTutorialToEdit}
      />
    ));
    return (
      <div className="display-items col">
        <h2>Tutorials</h2>
        <ul>{tutorialItemComponents}</ul>
      </div>
    );
  }
}

export default Tutorials;