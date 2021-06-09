import React from 'react';
import PropTypes from 'prop-types';
import { useActiveTabsContext } from '~/app/components/Service/context/ActiveTabsContext';
import { useCurrentServiceContext } from '~/app/ContextWrappers/contexts/CurrentService';
import { SETTINGS } from '~/app/components/Service/constants';
import styles from './styles.scss';

const propTypes = {
  users: PropTypes.object
};

const ServiceSettings = ({ users }) => {
  const { activeTab } = useActiveTabsContext();
  const { currentService } = useCurrentServiceContext();

  if (activeTab !== SETTINGS) {
    return null;
  }
  return (
    <div className={ styles.container }>
      <table>
        <tbody>
          {
            Object.keys(users[currentService]).map((key) => (
              <tr key={ key }>
                <td>{ key }:</td>
                <td>{ JSON.stringify(users[currentService][key]) }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

ServiceSettings.propTypes = propTypes;

export default ServiceSettings;
