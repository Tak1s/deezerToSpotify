import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

export const StreamService = ({ name, link }) => (
  <a
    className={ styles.serviceWrapper }
    href={ link }
  >
    { name }
  </a>
);

StreamService.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string
};

export default StreamService;
