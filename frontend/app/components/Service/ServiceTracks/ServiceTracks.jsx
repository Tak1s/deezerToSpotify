import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useActiveTabsContext } from '~/app/components/Service/context/ActiveTabsContext';
import { useCurrentServiceContext } from '~/app/ContextWrappers/contexts/CurrentService';
import { TRACKS } from '~/app/components/Service/constants';
import styles from './styles.scss';

const propTypes = {
  users: PropTypes.object,
  tracks: PropTypes.object,
  getServiceTracks: PropTypes.func
};

const deezerItem = (track) => (
  <div
    key={ track.id }
    className={ styles.row }
  >
    <div className={ cn(styles.col, styles.albumsCover) }>
      <img
        className={ styles.img }
        src={ track.artist.picture_small }
        alt={ track.album.title }
      />
    </div>
    <div className={ styles.col }>
      { track.title }
    </div>
    <div className={ styles.col }>
      { track.artist.name }
    </div>
    <div className={ styles.col }>
      { track.album.title }
    </div>
  </div>
);

// eslint-disable-next-line react/prop-types
const spotifyItem = (item) => {
  const { track } = item;
  return (
    <div
      key={ track.id }
      className={ styles.row }
    >
      <div className={ cn(styles.col, styles.albumsCover) }>
        <img
          className={ styles.img }
          src={ track.album.images[1].url }
          alt={ track.album.name }
        />
      </div>
      <div className={ styles.col }>
        { track.name }
      </div>
      <div className={ styles.col }>
        { track.artists[0].name }
      </div>
      <div className={ styles.col }>
        { track.album.name }
      </div>
    </div>
  );
};

const noTrackList = () => (
  <div className={ styles.row }>
    <div className={ cn(styles.col, styles.emptyRow) }>
      No track list
    </div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const ServiceTracks = ({
  users,
  tracks,
  getServiceTracks
}) => {
  const { currentService } = useCurrentServiceContext();
  const { activeTab } = useActiveTabsContext();

  useEffect(() => {
    if (users[currentService].id) {
      getServiceTracks(currentService, users[currentService].id);
    }
  }, [currentService, users[currentService].id]);

  const renderTracks = useCallback(() => {
    if (currentService === 'deezer') {
      return tracks[currentService].data.map(deezerItem);
    }
    if (currentService === 'spotify') {
      return tracks[currentService].items.map(spotifyItem);
    }
    return noTrackList();
  }, [currentService, tracks[currentService]]);

  if (activeTab !== TRACKS) {
    return null;
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.table }>
        <div className={ styles.thead }>
          <div className={ styles.row }>
            <div className={ cn(styles.col, styles.albumsCover) } />
            <div className={ styles.col }>
              Title
            </div>
            <div className={ styles.col }>
              Artist
            </div>
            <div className={ styles.col }>
              Album
            </div>
          </div>
        </div>
        <div className={ styles.tbody }>
          {
            currentService in tracks
              ? renderTracks()
              : noTrackList()
          }
        </div>
      </div>
    </div>
  );
};

ServiceTracks.propTypes = propTypes;

export default ServiceTracks;
