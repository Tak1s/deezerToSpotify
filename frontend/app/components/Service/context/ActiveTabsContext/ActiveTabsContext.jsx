import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TRACKS } from '~/app/components/Service/constants';

const defaultValue = {
  activeTab: '',
  setActiveTab: () => {}
};

const ActiveTabsContext = createContext(defaultValue);

export function useActiveTabsContext() {
  const context = useContext(ActiveTabsContext);
  if (!context) {
    throw 'Should wrap to ActiveTabsContext';
  }
  return context;
}

const propTypes = {
  children: PropTypes.node
};

const ActiveTabsContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(TRACKS);
  const contextValue = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
  return (
    <ActiveTabsContext.Provider value={ contextValue }>
      { children }
    </ActiveTabsContext.Provider>
  );
};

ActiveTabsContextProvider.propTypes = propTypes;

export default ActiveTabsContextProvider;
