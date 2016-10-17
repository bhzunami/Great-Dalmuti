import Game from './Game';

export default class Lobby {
  constructor() {
    this.games = [];
    this.players = [];
  }

  create_new_game(creator_id, data) {
    const creator = this.players.find(p => p.id == creator_id);
    if( creator === undefined) {
      console.log("ERROR: User not found");
      throw "Player with id " +creator_id +" was not found on server";
    }
    // always create an 5 digits long game id
    const game_id = Math.floor(Math.random() * (10**5 - 10**4) + 10**4);
    const game = new Game(creator, game_id, data);
    this.games.push(game);
    console.log("Create new Game: ", game);
    creator.game_id = game_id;
    return game;
  }

  removePlayer(id) {
    // Get player
    const player = this.players.find(p => p.id == id);
    // Check if player was in a game
    if( player.game_id > 0) {
      // Remove player from game
      const game = this.games.find(g => g.id == player.game_id);
      if( game === undefined ) {
        return 0;
      }
      game.removePlayer(player);
      return game.id;
    }
    // Remove the player from the lobby
    this.players = this.players.filter(p => p.id != id);
    return 0;
  }
}
