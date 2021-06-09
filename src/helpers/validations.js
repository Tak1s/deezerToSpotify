import { services } from '../../config/constants';

export const checkServiceName = (rawServiceName) => {
  const serviceName = services[rawServiceName] || '';

  if (!serviceName) {
    throw new Error('Unknown service');
  }
  return serviceName;
};
