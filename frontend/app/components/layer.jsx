import PropTypes from 'prop-types';
import React from 'react';
import style from './styles.scss';

const Layer = ({ children }) => (
  <div className={ style.transparent }>
    <div className={ style.wrapper }>
      {children}
    </div>
  </div>
);

Layer.propTypes = {
  children: PropTypes.node
};

export default Layer;
