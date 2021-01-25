import React from 'react';
// import PropTypes from 'prop-types';
import ServiceHeader from './ServiceHeader';
import ServiceTracks from './ServiceTracks';
import ServiceSettings from './ServiceSettings';
import { ActiveTabsContextProvider } from './context/ActiveTabsContext';
// import styles from './styles.scss';

// const propTypes = {
//   test: PropTypes.bool,
// };

const Service = () => (
  <ActiveTabsContextProvider>
    <ServiceHeader />
    <ServiceTracks />
    <ServiceSettings />
  </ActiveTabsContextProvider>
);

// ServiceTracks.propTypes = propTypes;

export default Service;
