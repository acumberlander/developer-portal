import React from 'react';
import './Tutorials.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../../Helpers/Data/propz/listingShape';
import SingleTutorial from '../../SingleTutorial/SingleTutorial';

class Turtorials extends React.Component {
  static propType = {
    tutorials: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  render() {
    const {
      tutorials,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    const tutorialsItemComponents = tutorials.map(tutorial => (
      <SingleTutorial
        tutorial={tutorial}
        key={tutorial.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
        updateSingleIsCompleted={updateSingleIsCompleted}
      />
    ));
    return (
      <div className="tutorials mt-4">
        <ul>{tutorialsItemComponents}</ul>
      </div>
    );
  }
}

export default Turtorials;
