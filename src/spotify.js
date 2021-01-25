import axios from 'axios';
import request from './helpers/request';
import url from 'url';
import { getServiceConfig, getServiceTokenByUuid, removeUserToken } from './helpers/db';
import { services } from '../config/constants';
import { getDeezerUserInfo } from './deezer';

const YOUR_REDIRECT_URI = 'http://localhost:9696/auth-callback/spotify';
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const USER_INFO_URL = 'https://api.spotify.com/v1/me';

export const getSpotifyAuthUrl = async (uuid) => {
  try {
    const { app_id } = await getServiceConfig(services.spotify);
    const params = {
      client_id: app_id,
      response_type: 'code',
      redirect_uri: YOUR_REDIRECT_URI,
      scope: 'user-library-read',
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
export const getSpotifyToken = async (code) => {
  try {
    const { app_id, secret_key } = await getServiceConfig(services.spotify);
    const params = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: YOUR_REDIRECT_URI
    };
    const options = {
      headers: {
        Authorization: `Basic ${ Buffer.from(`${ app_id }:${ secret_key }`).toString('base64') }`
      }
    };
    return await request({ url: TOKEN_URL, params, method: 'post', options });
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
export const getSpotifyUserInfo = async (serviceName, uuid) => {
  try {
    const { token_type, access_token } = await getServiceTokenByUuid(serviceName, uuid);
    if (token_type && access_token) {
      const options = { headers: { Authorization: `${ token_type } ${ access_token }` } };
      return await request({ url: USER_INFO_URL, options });
    }
    return Promise.reject({});
  } catch (err) {
    return checkResponseData(err, serviceName, uuid);
  }
};

const checkResponseData = (err, serviceName, uuid) => {
  if (err.response.status && err.response.status === 401) {
    removeUserToken(serviceName, uuid);
    return {};
  }
  throw err;
};

/**
 * @param serviceName
 * @param uuid
 * @returns {Promise<never>|{}|*}
 */
export const getSpotifyUserTracks = async (serviceName, uuid) => {
  try {
    const { access_token } = await getServiceTokenByUuid(serviceName, uuid);
    const { id } = await getDeezerUserInfo(serviceName, uuid);
    if (access_token) {
      const res = await request({ url: USER_TRACKS_URL(id), params: { access_token } });
      return checkResponseData(res, serviceName, uuid);
    }
    return Promise.reject({});
  } catch (err) {
    throw err;
  }
}
