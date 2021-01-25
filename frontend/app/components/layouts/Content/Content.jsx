import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Content = ({ children }) => (
  <div className={ styles.contentContainer }>
    { children }
  </div>
);

Content.propTypes = {
  children: PropTypes.node
};

export default Content;
