/* eslint-disable */
import axios from 'axios';

/**
 * @param {String} url
 * @param {Object} data
 * @param {Object} params
 * @param {String} method
 * @param {Object} options
 */
const request = async ({ url, data, params, method = 'get', options = {} }) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      params,
      ...options
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default request;
