import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useActiveTabsContext } from '~/app/components/Service/context/ActiveTabsContext';
import { useCurrentServiceContext } from '~/app/ContextWrappers/contexts/CurrentService';
import { TRACKS } from '~/app/components/Service/constants';
import styles from './styles.scss';

const propTypes = {
  users: PropTypes.object,
  tracks: PropTypes.object,
  getServiceTracks: PropTypes.func
};

const ServiceTracks = ({ users, tracks, getServiceTracks }) => {
  const { currentService } = useCurrentServiceContext();
  const { activeTab } = useActiveTabsContext();

  useEffect(() => {
    if (users[currentService].id) {
      getServiceTracks(currentService, users[currentService].id);
    }
  }, [currentService, users[currentService].id]);

  if (activeTab !== TRACKS) {
    return null;
  }
  return (
    <div className={ styles.container }>
      ServiceTracks
      { tracks || null}
    </div>
  );
};

ServiceTracks.propTypes = propTypes;

export default ServiceTracks;
