export default {
  protocol: ENV.PROXY_PROTOCOL || window.location.protocol,
  hostname: ENV.PROXY_HOSTNAME || window.location.hostname,
  port: ENV.PROXY_PORT || window.location.port,
  pathSuffix: ENV.PROXY_SUFFIX || ''
};
