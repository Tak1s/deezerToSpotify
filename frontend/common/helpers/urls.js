import config from '~/common/config';

export default {
  getUrl: (path = '') => {
    const { protocol, hostname, port, pathSuffix } = config;
    return `${ protocol.replace(':', '') }://${ hostname }:${ port }${ pathSuffix }${ path }`;
  }
  // getApiUrl: (path) => {
  //   const { protocol, hostname, port, pathSuffix } = config;
  //   return `${ protocol }://${ hostname }:${ port }/${ pathSuffix }`;
  // },
};
