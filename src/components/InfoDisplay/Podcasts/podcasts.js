import React from 'react';
import './Podcasts.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../../Helpers/Data/propz/listingShape';
import SinglePodcast from '../../SinglePodcast/SinglePodcast';

class Podcasts extends React.Component {
  static propType = {
    podcasts: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  render() {
    const {
      podcasts,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    const podcastsItemComponents = podcasts.map(podcast => (
      <SinglePodcast
        podcast={podcast}
        key={podcast.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
        updateSingleIsCompleted={updateSingleIsCompleted}
      />
    ));
    return (
      <div className="podcasts mt-4">
        <ul>{podcastsItemComponents}</ul>
      </div>
    );
  }
}

export default Podcasts;
