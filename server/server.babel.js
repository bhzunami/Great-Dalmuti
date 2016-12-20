import express from 'express'
import http from 'http'
import fs from 'fs'

import Lobby from './../models/Lobby'


// read data on startup
const dataFile = "data.json";

const Datastore = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

// reinit objects
Datastore.lobby = new Lobby(Datastore.lobby);

// save data every second
setInterval(() => {
  fs.writeFile(dataFile, JSON.stringify(Datastore), (err) => {
    if (err) console.error("Error writing JSON file!", err);
  });
}, 1000);


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
