"use strict";

import Player from './../models/Player';

let io;
const sockets = module.exports.sockets = {};

module.exports.init = function (socket_io, lobby) {
  io = socket_io;

  io.on('connection', function (socket) {
    sockets[socket.handshake.sessionID] = socket;
    const player = lobby.connect(socket.handshake.sessionID);
    console.log("There are ", lobby.players.filter(p => p.active).length, " active players in gameLobby");
    console.log("There are ", lobby.players.filter(p => !p.active).length, " inactive players in gameLobby");

    socket.on('game.create', (data, answer) => {
      try {
        const game = lobby.create_new_game(socket.handshake.sessionID, data);
        console.log("Create new game: ", game.id);
        // Joining room
        socket.join(game.id);
        answer(game);
      } catch (error) {
        answer('error', error);
      }
    });

    socket.on('game.get', (game_id, answer) => {
      answer(lobby.games.find(g => g.id == game_id));
    });

    socket.on('game.join', (game_id, answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      if (player === undefined) {
        console.log("ERROR: Player with ", socket.handshake.sessionID, "not found");
        answer(null, "Player not found");
        return;
      }
      const game = lobby.games.find(g => g.id == game_id);
      if (game === undefined) {
        console.log("ERROR: Game with ", game_id, "not found");
        answer(null, "Game not found");
        return;
      }
      try {
        game.join(player);
        console.log("Now there are ", game.players.length, " Player in the game");
        socket.join(game.id);
        answer(game);
        Socket.sendRoom(game.id, game);
      } catch (error) {
        answer(null, error);
      }
    });

    socket.on('game.start', (data, answer) => {
      try {
        const game = lobby.games.find(g => g.id == data.game_id);
        game.start(data);
        Socket.sendRoom(game.id, 'start', game);
      } catch (error) {
        answer(null, error);
      }
    });

    socket.on('player.create', (player_data, answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      player.name = player_data.name;
      player.avatar = player_data.avatar;
      answer(player);
    });

    socket.on('player.self', (answer) => {
      answer(lobby.players.find(p => p.id == socket.handshake.sessionID));
    });

    socket.on('disconnect', function () {
      delete sockets[socket.handshake.sessionID];
      console.log("Player ", socket.handshake.sessionID, "has left");
      const game_id = lobby.disconnect(socket.handshake.sessionID);
      if (game_id > 0) {
        Socket.sendRoom(game_id, lobby.games.find(g => g.id == game_id));
      }
    });
  });

  io.use((socket, next) => {
    socket.handshake.sessionID = socket.request._query.sessionID;
    next();
  });
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

