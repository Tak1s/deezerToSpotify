import url from 'url';
import request from './helpers/request';
import { getServiceConfig, getServiceTokenByUuid, removeUserToken } from './helpers/db';
import { services } from '../config/constants';

const YOUR_REDIRECT_URI = 'http://localhost:9696/auth-callback/deezer';
const AUTH_URL = 'https://connect.deezer.com/oauth/auth.php';
const TOKEN_URL = 'https://connect.deezer.com/oauth/access_token.php';
const USER_INFO_URL = 'https://api.deezer.com/user/me';
const USER_TRACKS_URL = (id) => `https://api.deezer.com/user/${id}/tracks`;

/**
 * @param {String} uuid
 * @returns {Promise<string|null>}
 */
export const getDeezerAuthUrl = async (uuid) => {
  try {
    const { app_id } = await getServiceConfig(services.deezer);
    const params = {
      app_id,
      redirect_uri: YOUR_REDIRECT_URI,
      perms: 'basic_access',
      state: uuid
    };
    const queryParams = new url.URLSearchParams(params);
    return `${ AUTH_URL }?${ queryParams.toString() }`;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * @param {String} code for recive token
 */
export const getDeezerToken = async (code) => {
  try {
    const { app_id, secret_key } = await getServiceConfig(services.deezer);
    const params = {
      app_id,
      secret: secret_key,
      code,
      output: 'json'
    };
    return await request({ url: TOKEN_URL, params });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * @param {String} serviceName
 * @param {String} uuid
 * @returns {Promise<void>}
 */
export const getDeezerUserInfo = async (serviceName, uuid) => {
  try {
    const { access_token } = await getServiceTokenByUuid(serviceName, uuid);
    if (access_token) {
      const res = await request({ url: USER_INFO_URL, params: { access_token } });
      return checkResponseData(res, serviceName, uuid);
    }
    return Promise.reject({});
  } catch (err) {
    throw err;
  }
};

const checkResponseData = (res, serviceName, uuid) => {
  if (res.error) {
    if (res.error.code === 300) {
      removeUserToken(serviceName, uuid);
      return {};
    } else {
      throw err;
    }
  }
  return res;
};

/**
 * @param {String} serviceName
 * @param {String} uuid
 * @param {String} userId
 * @returns {Promise<never>|{}|*}
 */
export const getDeezerUserTracks = async (serviceName, uuid, userId) => {
  try {
    const { access_token } = await getServiceTokenByUuid(serviceName, uuid);
    if (access_token) {
      const res = await request({ url: USER_TRACKS_URL(userId), params: { access_token } });
      return checkResponseData(res, serviceName, uuid);
    }
    return Promise.reject({});
  } catch (err) {
    throw err;
  }
};
