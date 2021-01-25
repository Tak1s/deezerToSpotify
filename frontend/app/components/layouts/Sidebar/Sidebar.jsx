import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Sidebar = ({ children }) => (
  <div className={ styles.sidebarContainer }>
    { children }
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.node
};

export default Sidebar;
