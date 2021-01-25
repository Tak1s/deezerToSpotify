import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import StreamService from './StreamService';
import { useCurrentServiceContext } from '~/app/ContextWrappers/contexts/CurrentService';
import styles from './styles.scss';
import { streamServicesList } from './constants';

const StreamServiceList = ({ getDeezerInfo, getSpotifyInfo }) => {
  const {
    currentService,
    setCurrentService
  } = useCurrentServiceContext();

  useEffect(() => {
    getDeezerInfo();
    getSpotifyInfo();
  }, []);

  return (
    <div className={ styles.container }>
      { streamServicesList.map(({ id, title, icon }) => (
        <StreamService
          key={ id }
          id={ id }
          title={ title }
          icon={ icon }
          active={ currentService === id }
          onSelectService={ setCurrentService }
        />
      )) }
    </div>
  );
};

StreamServiceList.propTypes = {
  getDeezerInfo: PropTypes.func,
  getSpotifyInfo: PropTypes.func
};

export default StreamServiceList;
