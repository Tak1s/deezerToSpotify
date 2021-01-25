import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './style.scss';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  onSelectService: PropTypes.func
};

export const StreamService = ({ id, title, icon, active, onSelectService }) => {
  const onClick = () => {
    onSelectService(id);
  };

  return (
    <div
      className={ cn(styles.serviceWrapper, styles[id], { [styles.active]: active }) }
      onClick={ onClick }
    >
      <span>
        { title }
        <img
          className={ styles.icon }
          src={ icon }
          alt={ title }
        />
      </span>
    </div>
  );
};

StreamService.propTypes = propTypes;

export default StreamService;
