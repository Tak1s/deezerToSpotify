const http = require('http');
const debug = require('debug');

const logger = debug('DeezerToSpotify');
const server = http.createServer((req, res) => {
  const reqLogger = logger.extend('requestHandler');
  const handlerMethod = {
    POST: () => {
      reqLogger('post');
      const handlerUri = {
        '/test': () => {
          reqLogger('post');
        }
      };
    },
    GET: () => {
      reqLogger.extend('get')(req.url);
      const handlerUri = {
        '/auth-callback': () => {
          res.end('DeezerToSpotify auth callback');
        }
      };
      typeof handlerUri[req.url] === 'function'
        ? handlerUri[req.url]()
        : res.end(`
          <!doctype html>
          <html>
          <body>
              DeezerToSpotify
          </body>
          </html>
        `);
    }
  };

  typeof handlerMethod[req.method] === 'function' && handlerMethod[req.method]();
});

server.listen(3000, () => {
  logger('Server created!');
});
