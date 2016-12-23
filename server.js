require('babel-register');

process.on('uncaughtException', (err) => {
  console.log('Caught exception: ' + err);
});

require('./server/server.babel');

