import express from 'express'
import http from 'http'

import Lobby from './../models/Lobby'

const Datastore = {
  lobby: new Lobby(),
}


const app = express();
// assets
app.use('/bundled', express.static('public/bundled'));
app.use('/static', express.static('public/static'));
// client routes
app.get(/^\//, (req, res) => {
  res.sendFile('./public/index.html', { root: '.' });
});

/**
 * Create Socket IO Server
 */

var server = http.createServer(app);
var io = require('socket.io').listen(server);
require('./socket').init(io, Datastore.lobby);

server.listen(process.env.PORT || 3000);
