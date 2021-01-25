import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Tabs from './Tabs';
import { streamServicesList } from '~/app/components/StreamServiceList';
import { useCurrentServiceContext } from '~/app/ContextWrappers/contexts/CurrentService';
import styles from './styles.scss';

const propTypes = {
  users: PropTypes.object
};

const ServiceHeader = ({ users }) => {
  const { currentService } = useCurrentServiceContext();

  const title = useMemo(() => {
    if (Object.keys(users[currentService]).length) {
      return users[currentService].name;
    }
    const streamService = streamServicesList.find((service) => service.id === currentService);
    return streamService.title || 'Stream services';
  }, [currentService, users[currentService]]);

  const getControls = () => {
    if (Object.keys(users[currentService]).length) {
      return (
        <Tabs />
      );
    }
    return (
      <a
        className={ styles.loginLink }
        href={ streamServicesList.find((service) => service.id === currentService).link }
      >
        Log in
      </a>
    );
  };

  return (
    <div className={ cn(styles.container, styles[currentService]) }>
      <div className={ styles.title }>
        { title }
      </div>
      { getControls() }
    </div>
  );
};

ServiceHeader.propTypes = propTypes;

export default ServiceHeader;
