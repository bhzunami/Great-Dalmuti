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

  start() {
    // check if everything is ready to start
    if (this.players.length < 4) {
      throw "There are not enough player";
    }
    this.started = true;

  }

  elect(player_id, card_id) {
    const player = this.players.find(p = p.id == player_id);
    const locked_cards = this.players.filter(p => p.rank == card_id);
    if (locked_cards.length > 0) {
      console.log("WARN: This card was choosen before");
      throw "card_locked";
    }
    player.rank = card_id;

    return RANKS.card_id;
  }

  removePlayer(player) {
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
