"use strict";

const cookieParser = require('cookie-parser')(process.env.SECRET || 'some_secret_key');

let io;
const sockets = module.exports.sockets = {};

module.exports.init = function(socket_io, cookieSessionMiddleware) {

  io = socket_io;

  io.use((socket, next) => {
        cookieSessionMiddleware(socket, {}, next);
  });

  io.on('connection', function(socket) {
    sockets[socket.id] = socket;
    //const s = new Socket(io);
    // Only send sockets to the new client
    Socket.send(socket.id, 'welcome', socket.id);
    //io.to(socket.id).emit('welcome', socket.id);

    socket.on('test', data =>{
      Socket.send(socket.id, "test", data);
    });

    socket.on('disconnect', function() {
      delete sockets[socket.id];
    //  console.log('user disconnected, bye');
    });
  });

//   io.set('authorization', function(handshake, callback) {
//     console.log(handshake);
//     if (handshake.headers.cookie) {
//       // pass a req, res, and next as if it were middleware
//       cookieParser(handshake, null, function(err) {
//         handshake.sessionID = handshake.cookies['session'];
//         // or if you don't have signed cookies
// //        handshake.sessionID = handshake.cookies['connect.sid'];

//       });
//     } else {
//       callback('No session.', false);
//     }
//   });
};

const Socket = module.exports.Socket = {
  send: function(client_id, head, msg) {
    //console.log("Send message to", client_id, " with message", msg);
    io.to(client_id).emit(head, msg);
  },

  sendAll: function(head, msg) {
    io.emit(head, msg);
  },
  sendEvent: (event) => { // TODO don't send event to all users
    Socket.sendAll("event", event);
  }
};

