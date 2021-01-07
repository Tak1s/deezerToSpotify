import express from 'express';
import { nanoid } from 'nanoid';
import request from '../helpers/request';
import { getServiceConfig } from '../helpers/db';

const YOUR_APP_ID = '455302';
const YOUR_REDIRECT_URI = 'http://localhost:3000/auth-callback/deezer';
const SECRET_KEY = '024f6aa54ae4ffec031f2fe55bb5eabc';
const authUrl = `https://connect.deezer.com/oauth/auth.php?app_id=${ YOUR_APP_ID }&redirect_uri=${ YOUR_REDIRECT_URI }&perms=basic_access&state=`;
const tokenUrl = `https://connect.deezer.com/oauth/access_token.php?app_id=${ YOUR_APP_ID }&secret=${ SECRET_KEY }&output=json&code=`;
// const token = 'frOStaTtAGZU6Sj17VP5otU2RV5r4igBVQzqVMUFVWPuNdx0Yx7';
const users = {}; // uuid: {id: , token: , code: }

const router = express.Router();

router.get('/auth/:serviceName', (req, res) => {
  // let uuid;
  // const cookies = new Cookies(req, res);
  // req.params.serviceName
  let uuid = req.cookies['user_id'];
  if (!uuid) {
    uuid = nanoid();
    users[uuid] = {
      id: uuid,
      token: '',
      code: ''
    };
    res.writeHead(302, { 'Location': authUrl + uuid });
    res.end();
  }
  request(tokenUrl + users[uuid].code).then((result) => {
    users[uuid] = {
      ...(users[uuid] || {}),
      token: result.data.access_token,
      expires: result.data.expires
    };
    // request(`https://api.deezer.com/user/me?access_token=${result.data.access_token}`).then((result) => {
    //
    //   res.end(JSON.stringify({ gg: 'test' }));
    // }).catch(() => res.end(`Error get user=${ uuid }`));
    res.writeHead(302, { 'Location': 'http://localhost:3000/user' });
    res.end();
  }).catch((err) => {
    res.end(`Error user_id=${ uuid }`);
  });
});

router.get('/user', (req, res) => {
  // let uuid;
  // const cookies = new Cookies(req, res);
  let uuid = req.cookies['user_id'];
  request(`https://api.deezer.com/user/me?access_token=${ users[uuid].token }`).then((result) => {

    res.end(JSON.stringify(result.data));
  });
});

router.get('/auth-callback/:serviceName', (req, res) => {
  const { code, state } = req.query;
  // const cookies = new Cookies(req, res);
  users[state] = {
    ...(users[state] || {}),
    code
  };
  res.cookie('user_id', state);
  res.writeHead(302, { 'Location': 'http://localhost:9696/' });
  res.end();
  // res.end(`DeezerToSpotify auth callback ${ code }`);
});

export default router;
