"use strict";

import Player from './../models/Player';

const cookieParser = require('cookie-parser')(process.env.SECRET || 'some_secret_key');

let io;
const sockets = module.exports.sockets = {};

module.exports.init = function (socket_io, cookieSessionMiddleware, lobby) {
  io = socket_io;

  io.use((socket, next) => {
    cookieSessionMiddleware(socket, {}, next);
  });

  io.on('connection', function (socket) {
    sockets[socket.id] = socket;
    console.log("New user ", socket.id);
    const player = new Player(socket.id);
    lobby.players.push(player);
    console.log("There are ", lobby.players.length, " players in gameLobby");

    //io.to(socket.id).emit('welcome', socket.id);
    socket.on('game.create', (data, answer) => {
      try {
        const game = lobby.create_new_game(socket.id, data);
        console.log("Create new game: ", game.id);
        // Joining room
        socket.join(game.id);
        console.log("Send game: " +game);
        answer(game);
      } catch (error) {
        answer('error', error);
      }
    });

    socket.on('game.join', (game_id, answer) => {
      const player = lobby.players.find(p => p.id == socket.id);
      if(player === undefined ) {
        console.log("ERROR: Player with ", socket.id, "not found");
        answer(null, "Player not found");
      }
      const game = lobby.games.find(g => g.id == game_id);
      if(game === undefined ) {
        console.log("ERROR: Game with ", game_id, "not found");
        answer(null, "Game not found");
      }
      try {
        game.join(player);
        console.log("New Player connected to game: ", game.id);
        console.log("Now there are ", game.players.length, " Player in the game");
        socket.join(game.id);
        answer(game);
      } catch (error) {
        answer('error', error);
      }
    });

    socket.on('game.start', (data, answer) => {
      try {
        const game = lobby.games.find(g => g.id == data.game_id)
        game.init();
        Socket.sendRoom(game.id, 'game.start', '');
      } catch (error) {
        Socket.send(socket.id, 'error', error);
      }
    });

    socket.on('game.election', (data, answer) => {
      try {
        const game = lobby.games.find(g => g.id == data.game_id);
        game.elect(data);
      } catch (error) {
        Socket.send(socket.id, 'error', error);
      }

    });


    socket.on('player.create', (player_data, answer) => {
      const player = lobby.players.find(p => p.id == socket.id);
      player.name = player_data.name;
      player.avatar = player_data.avatar;
      answer(player);
    });

    socket.on('disconnect', function () {
      delete sockets[socket.id];
      console.log("Player ", socket.id, "has left");
      const game_id = lobby.removePlayer(socket.id);
      if (game_id > 0) {
        Socket.sendRoom(game_id, 'player_left', socket.id);
      }
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

  // Send message to a specific user
  send: function (client, head, msg) {
    io.to(client).emit(head, msg);
  },

  // Send message to a game room
  sendRoom: function (room, head, msg) {
    io.to(room).emit(room, head, msg);
  },

  // Send message to all connected clients
  sendAll: function (head, msg) {
    io.emit(head, msg);
  },
};

