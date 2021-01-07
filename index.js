import express from 'express';
import debug from 'debug';
import cookieParser from 'cookie-parser';
import router from './src/router';
const logger = debug('DeezerToSpotify');

const app = express();

app.use(cookieParser());

app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
  logger('Server created!');
});
