import Game from './../models/Game';

export default class Lobby {
  constructor() {
    this.games = [];
    this.players = [];
  }

  create_new_game(creator_id, { max_players=4, password=""} ) {
    const creator = this.players.find(p => p.id == creator_id);
    if( creator === undefined) {
      console.log("ERROR: User not found");
      throw "Player with id " +creator_id +" was not found on server";
    }
    const game_id = Math.floor(Math.random()*100000);
    const game = new Game(creator, game_id, max_players, password);
    this.games.push(game);
    console.log("Create new Game: ", game);
    creator.game_id = game_id;
    return game_id;
  }

  join_game(game_id, player_id) {
    console.log("Join game ", game_id, "with player id:", player_id);
    const game = this.games.find(g => g.id == game_id);
    if(game === undefined ) {
      console.log("ERRRO: Game not found");
      throw "Game with id" +game_id +" was not found on server";
    }
    if(game.players.length == game.max_players) {
      console.log("ERROR: Maximum User reached for this game.")
      throw "Maximum users reached";
    }
    const player = this.players.find(p => p.id == player_id);
    if( player === undefined || player.isPlaying ) {
      console.log("ERROR: Player not found");
      throw "Player with id" +player_id +" was not found on server";
    }
    player.game_id = game_id;
    game.players.push(player);
    console.log("Player added to Game", player.id);
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
