import PropTypes from 'prop-types';
import React from 'react';
import style from './styles.scss';

const Layout = ({ children }) => (
  <div className={ style.transparent }>
    <div className={ style.wrapper }>
      { children }
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
