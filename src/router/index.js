import express from 'express';
import { nanoid } from 'nanoid';
import { setUserToken } from '../helpers/db';
import { checkServiceName } from '../helpers/validations';
import {
  getDeezerToken,
  getDeezerAuthUrl,
  getDeezerUserInfo,
  getDeezerUserTracks
} from '../deezer';
import {
  getSpotifyToken,
  getSpotifyAuthUrl,
  getSpotifyUserInfo,
  getSpotifyUserTracks
} from '../spotify';

const router = express.Router();

const getAuthUrl = {
  deezer: getDeezerAuthUrl,
  spotify: getSpotifyAuthUrl
}

const getToken = {
  deezer: getDeezerToken,
  spotify: getSpotifyToken
};

const getUserInfo = {
  deezer: getDeezerUserInfo,
  spotify: getSpotifyUserInfo
}

const getUserTracks = {
  deezer: getDeezerUserTracks,
  spotify: getSpotifyUserTracks
}

router.get('/auth/:serviceName', async (req, res) => {
  const uuid = req.cookies['user_id'] || nanoid();
  try {
    const serviceName = checkServiceName(req.params.serviceName);
    const authUrl = await getAuthUrl[serviceName](uuid);

    res.writeHead(302, { Location: authUrl });
  } catch(err) {
    res.writeHead(302, { Location: req.headers.referer + '?error=500' });
  } finally {
    res.end();
  }
});

router.get('/auth-callback/:serviceName', async (req, res) => {
  const { code, state: uuid } = req.query;
  try {
    const serviceName = checkServiceName(req.params.serviceName);
    const data = await getToken[serviceName](code);
    await setUserToken(serviceName, uuid, data);

    res.cookie('user_id', uuid);
    res.writeHead(302, { 'Location': 'http://localhost:9696/' });
  } catch (err) {
    console.error(err);
    res.writeHead(302, { 'Location': 'http://localhost:9696/?error=500' });
  } finally {
    res.end();
  }
});

router.get('/user/:serviceName', async (req, res) => {
  let uuid = req.cookies['user_id'];
  try {
    const serviceName = checkServiceName(req.params.serviceName);
    const data = await getUserInfo[serviceName](serviceName, uuid);

    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

router.get('/user/:serviceName/treks/:userId', async (req, res) => {
  let uuid = req.cookies['user_id'];
  try {
    const serviceName = checkServiceName(req.params.serviceName);
    const data = await getUserTracks[serviceName](serviceName, uuid, req.params.userId);

    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

export default router;
