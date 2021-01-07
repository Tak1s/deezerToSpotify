import express from 'express';
import debug from 'debug';
import cookieParser from 'cookie-parser';
import router from './src/router';
const logger = debug('DeezerToSpotify');

const app = express();

app.use(cookieParser());

app.use('/', router);

router.get('/term-of-use', (req, res) => {
  res.end(`
      <!doctype html>
      <html>
      <body>
          DeezerToSpotify term of use
      </body>
      </html>
    `);
});

// const notFound = `
//           <!doctype html>
//           <html>
//           <body>
//               DeezerToSpotify 404
//           </body>
//           </html>
//         `;
//
// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

app.listen(process.env.PORT || 3000, () => {
  logger('Server created!');
});
