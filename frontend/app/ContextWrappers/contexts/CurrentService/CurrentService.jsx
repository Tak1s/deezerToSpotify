import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { streamServicesList } from '~/app/components/StreamServiceList/constants';

const defaultValue = {
  currentService: '',
  setCurrentService: () => {}
};

const CurrentServiceContext = createContext(defaultValue);

export function useCurrentServiceContext() {
  const context = useContext(CurrentServiceContext);
  if (!context) {
    throw 'Should wrap to CurrentServiceContextProvider';
  }
  return context;
}

const propTypes = {
  children: PropTypes.node
};

const CurrentServiceProvider = ({ children }) => {
  const [currentService, setCurrentService] = useState(streamServicesList[0].id);
  const contextValue = useMemo(() => ({ currentService, setCurrentService }), [currentService]);
  return (
    <CurrentServiceContext.Provider value={ contextValue }>
      { children }
    </CurrentServiceContext.Provider>
  );
};

CurrentServiceProvider.propTypes = propTypes;

export default CurrentServiceProvider;
