"use strict";

import Player from './../models/Player';

let io;
const sockets = module.exports.sockets = {};

module.exports.init = function (socket_io, lobby) {
  io = socket_io;

  // Handle all the websocket IO calls
  //- - - - - - - - - - - - - - - - - - - -
  // When a new connection is open we get the sessionId and create a new player if he does not exists in
  // our database
  io.on('connection', function (socket) {
    sockets[socket.handshake.sessionID] = socket;
    const player = lobby.connect(socket.handshake.sessionID);
    console.log("There are ", lobby.players.filter(p => p.active).length, " active players in gameLobby");
    console.log("There are ", lobby.players.filter(p => !p.active).length, " inactive players in gameLobby");

    // A new game is created and the new created room is joined
    socket.on('game.create', (data, answer) => {
      try {
        const game = lobby.create_new_game(socket.handshake.sessionID, data);
        console.log("Create new game: ", game.id);
        // Joining room to communicate in this room
        socket.join(game.id);
        answer(game);
      } catch (error) {
        answer('error', error);
      }
    });

    // Find a game with the given game id.
    // Called when player wants to join game
    socket.on('game.get', (game_id, answer) => {
      answer(lobby.games.find(g => g.id == game_id));
    });

    // Join to a game and room
    socket.on('game.join', (data, answer) => {
      console.log("Join ", data);
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      if (player === undefined) {
        console.log("ERROR: Player with ", socket.handshake.sessionID, "not found");
        answer(null, "Player not found");
        return;
      }
      const game = lobby.games.find(g => g.id == data.game_id);
      if (game === undefined) {
        console.log("ERROR: Game with ", data.game_id, "not found");
        answer(null, "Game not found");
        return;
      }
      try {
        game.join(player, data.password);
        console.log("Now there are ", Object.keys(game.players).length, " Player in the game");
        socket.join(game.id);
        answer(game);
        Socket.sendRoom(game.id, game);
      } catch (error) {
        console.log("Error in Join", error);
        answer(null, error);
      }
    });

    // Start a game
    socket.on('game.start', (answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);

      try {
        const game = lobby.games.find(g => g.id == player.game_id);

        console.log(game.start);
        game.start();
        answer(game);
        Socket.sendRoom(game.id, game);
      } catch (error) {
        answer(null, error);
        throw error;
      }
    });

    socket.on('game.new_game', (answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      try {
        const game = lobby.games.find(g => g.id == player.game_id);
        game.next_game();
        Socket.sendRoom(game.id, game);
      } catch (error) {
        answer(null, error);
        throw error;
      }
    });

    // Play a card
    socket.on('game.card_played', (cards, answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      try {
        const game = lobby.games.find(g => g.id == player.game_id);
        console.log("before play_card");
        game.play_card(player.id, cards);
        console.log("after play_card");
        Socket.sendRoom(game.id, game);
        console.log("after send room");
      } catch (error) {
        answer(null, error);
        throw error;
      }
    });

    socket.on('game.players', (answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      const game = lobby.games.find(g => g.id == player.game_id);

      answer(Object.keys(game.players).map(p_id => lobby.players.find(p => p.id == p_id)));
    });

    // Create a new player with name and avatar
    socket.on('player.create', (player_data, answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      player.name = player_data.name;
      player.avatar = player_data.avatar;
      answer(player);
    });

    // Get information about a player
    // Mostly used to get the sessionID from player
    socket.on('player.self', (answer) => {
      answer(lobby.players.find(p => p.id == socket.handshake.sessionID));
    });

    // Chat function to chat in a game
    socket.on('chat', (msg) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      sendAll(player.name, msg);
    });

    // extra data to be stored, from UI
    socket.on('player.extradata', (data, answer) => {
      const player = lobby.players.find(p => p.id == socket.handshake.sessionID);
      const game = lobby.games.find(g => g.id == player.game_id);
      game.players[player.id].extradata = data;
      answer(game);
    });

    // When player leaves (reload or disconnect) remove player from active players
    // and if in game from game too.

    socket.on('disconnect', function () {
      delete sockets[socket.handshake.sessionID];
      const game_id = lobby.disconnect(socket.handshake.sessionID);
      if (game_id > 0) {
        Socket.sendRoom(game_id, lobby.games.find(g => g.id == game_id));
      }
    });
  });

  // Extract the websocket session ID to use it as player id
  io.use((socket, next) => {
    socket.handshake.sessionID = socket.request._query.sessionID;
    next();
  });
};

/**
 * Export the Socket module to have three simple send method
 */
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

