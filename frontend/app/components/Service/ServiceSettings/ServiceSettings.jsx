import React from 'react';
// import PropTypes from 'prop-types';
import { useActiveTabsContext } from '~/app/components/Service/context/ActiveTabsContext';
import { SETTINGS } from '~/app/components/Service/constants';
import styles from './styles.scss';

// const propTypes = {
//   test: PropTypes.bool,
// };

const ServiceSettings = () => {
  const { activeTab } = useActiveTabsContext();

  if (activeTab !== SETTINGS) {
    return null;
  }
  return (
    <div className={ styles.container }>
      ServiceSettings
    </div>
  );
};

// ServiceTracks.propTypes = propTypes;

export default ServiceSettings;
