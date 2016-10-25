import Game from './Game';
import Player from './Player';

export default class Lobby {
  constructor() {
    this.games = [];
    this.player_storage = [];
    this.players = [];
  }

  create_new_game(creator_id, data) {
    const creator = this.players.find(p => p.id == creator_id);
    if (creator === undefined) {
      console.log("ERROR: User not found");
      throw "Player with id " + creator_id + " was not found on server";
    }
    // always create an 5 digits long game id
    const game = new Game(creator, data);
    this.games.push(game);
    creator.game_id = game.id;
    return game;
  }


  connect(id) {
    let player = this.player_storage.find(p => p.id == id);
    if (player === undefined) {
      console.log("Connect new Player with id: ", id);
      player = new Player(id);
      this.player_storage.push(player);
    }
    console.log("New player in lobby: ", player.id);
    // TODO: Only add player to players if he does not exist there
    this.players.push(player);
    return player;
  }

  disconnect(id) {
    // Get player
    const player = this.players.find(p => p.id == id);
    if (player === undefined) { return 0; }
    this.players = this.players.filter(p => p.id != id);
    // Check if player was in a game
    if (player.game_id > 0) {
      // Remove player from game
      const game = this.games.find(g => g.id == player.game_id);
      if (game !== undefined) {
        game.removePlayer(player);
        return game.id;
      }
    }
    return 0;
  }
}
