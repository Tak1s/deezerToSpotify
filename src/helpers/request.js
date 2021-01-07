import axios from 'axios';

const request = (url, method='get', data={}) => {
  return axios({
    method,
    url,
    data
  });
}

export default request;
