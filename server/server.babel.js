import express from 'express';
const cookieSession = require('cookie-session');
var http = require('http');
const app = express();

app.use('/', express.static('public'));

const cookieSessionMiddleware = cookieSession({
  secret: process.env.SECRET || 'some_secret_key',
  // domain: 'localhost:3000',
  maxAge: 365 * 86400 * 1000
});
app.use(cookieSessionMiddleware);
app.cookieSessionMiddleware = cookieSessionMiddleware; // for socket.io

/**
 * Create Socket IO Server
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
require('./socket').init(io, app.cookieSessionMiddleware);

server.listen(process.env.PORT || 3000);
