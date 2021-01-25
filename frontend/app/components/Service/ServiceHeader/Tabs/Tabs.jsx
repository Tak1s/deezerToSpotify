import React from 'react';
// import PropTypes from 'prop-types';
import Tab from './Tab';
import styles from './style.scss';
import { TRACKS, SETTINGS } from '~/app/components/Service/constants';
import { useActiveTabsContext } from '~/app/components/Service/context/ActiveTabsContext';

const Tabs = () => {
  const { activeTab, setActiveTab } = useActiveTabsContext();

  return (
    <div className={ styles.tabsContainer }>
      <Tab
        title="TRACKS"
        selectTab={ () => setActiveTab(TRACKS) }
        active={ activeTab === TRACKS }
      />
      <Tab
        title="SETTINGS"
        selectTab={ () => setActiveTab(SETTINGS) }
        active={ activeTab === SETTINGS }
      />
    </div>
  );
};

// Tabs.propTypes = {
//
// };

export default Tabs;
