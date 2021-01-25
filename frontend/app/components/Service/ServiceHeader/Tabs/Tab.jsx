import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './style.scss';

const propTypes = {
  title: PropTypes.string,
  selectTab: PropTypes.func,
  active: PropTypes.bool
};

const Tab = ({ title, selectTab, active }) => (
  <div
    className={ cn(styles.tab, { [styles.activeTab]: active }) }
    onClick={ selectTab }
  >
    { title }
  </div>
);

Tab.propTypes = propTypes;

export default Tab;
