import RANKS from './../models/Rank';


export default class Game {
  constructor(creator, id, {max_player = 4, passcode = "", name = ""}) {
    this.creator = creator;
    this.id = id;
    this.name = name;
    this.max_player = parseInt(max_player, 10);
    this.passcode = passcode;
    this.finish = false;
    this.started = false;
    this.players = [creator];
  }


  // This starts a total new game
  start() {
    if (this.players.length < this.max_player) {
      throw "There are not enough player";
    }
    this.started = true;
    const assigned_ranks = [];
    let rank = 0;
    this.players.forEach(p => {
      while (assigned_ranks.indexOf(rank) >= 0) {
        rank = p.draw_start();
      }
      p.rank = rank;
      p.create_card_set()
    });
  }

  // Start the next round
  next_round() {
    this.players.forEach(p => {
      p.create_card_set()
    });
  }

  removePlayer(player) {
    player.game_id = null;
    this.players = this.players.filter(p => p.id != player.id);
  }

  join(player) {
    console.log("Join game ", this.id, "with player id:", player.id);
    if (this.players.length == this.max_players) {
      console.log("ERROR: Maximum User reached for this game.")
      throw "Maximum users reached";
    }
    player.game_id = this.id;
    this.players.push(player);
    console.log("Player added to Game", player.id);
    return this;
  }
}
