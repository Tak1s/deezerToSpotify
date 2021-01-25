import React from 'react';
import PropTypes from 'prop-types';
import { CurrentServiceProvider } from './contexts/CurrentService';

const propTypes = {
  children: PropTypes.node
};

const ContextWrappers = ({ children }) => (
  <CurrentServiceProvider>
    { children }
  </CurrentServiceProvider>
);

ContextWrappers.propTypes = propTypes;

export default ContextWrappers;
