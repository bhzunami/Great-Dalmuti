import Game from './Game';
import Player from './Player';

/**
 * The Lobby controlls all games
 * and stores the games in a json file called data.json
 * If this file exists the stored data are loaded
 * 
   * @constructor
   * @param {lobby} A stored game lobby 
   */
export default class Lobby {
  constructor(lobby) {
    if (lobby === undefined) {
      this.games = [];
      this.players = [];
    } else {
      this.games = lobby.games;
      this.players = lobby.players;
    }
  }


  /**
   * Create a new game
   * @param{creator_id} The player id of the creator
   * @param{data} Some additional data for the game (max_players, password..)
   */
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

  /**
   * Connect a player to the lobby
   * @param{id} The id of the player
   * Checks if the player already exists in our database (reload) and then
   * add it to our players
   * 
   */
  connect(id) {
    let player = this.players.find(p => p.id == id);
    if (player === undefined) {
      console.log("Connect new Player with id: ", id);
      player = new Player(id);
      this.players.push(player);
    }
    player.active = true
    return player;
  }

  /**
   * If player left (reload or close tab) we remove the player
   * from our active player list
   * 
   * @param{id} The player id
   */
  disconnect(id) {
    // Get player
    const player = this.players.find(p => p.id == id);
    if (player === undefined) { return 0; }
    player.active = false;
    // Check if player was in a game
    if (player.game_id > 0) {
      // Remove player from game if he is in one
      const game = this.games.find(g => g.id == player.game_id);
      if (game !== undefined) {
        return game.id;
      }
    }
    return 0;
  }
}
