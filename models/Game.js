import { getCardsShuffled } from './Cards';

/**
 * Class representing a Game.
 *
 * @class Game
 */
export default class Game {
  /**
   * @constructor
   * @param {Player} creator - The creator of the game
   * @param {Dict} - Optional parameters
   */
  constructor(creator, {max_player = 4, passcode = "", name = ""}) {
    this.creator = creator;
    this.id = Math.floor(Math.random() * (10 ** 5 - 10 ** 4) + 10 ** 4);
    this.name = name;
    this.max_player = parseInt(max_player, 10);
    this.passcode = passcode;
    this.finish = false;
    this.started = false;
    this.players = [creator];
  }

  // Draw a card for the start of the game
  static draw_start() {
    return Math.floor(Math.random() * 12) + 1;
  }

  // This starts a total new game
  start() {
    if (this.players.length < this.max_player) {
      throw "There are not enough player";
    }

    this.assign_ranks();
    this.deal_cards();

    this.started = true;
  }

  assign_ranks() {
    const assigned_ranks = [];

    this.players.forEach(p => {
      let rank = 0;
      do {
        rank = Game.draw_start();
      } while (assigned_ranks.indexOf(rank) > -1)

      assigned_ranks.push(rank);
      p.rank = rank;
    });
    this.players = this.players.sort((a, b) => a.rank > b.rank);
  }

  deal_cards() {
    const cards = getCardsShuffled();

    let i = 0;
    while (cards.length > 0) {
      this.players[i].cards.push(cards.pop());
      i = (i + 1) % this.max_player;
    }
  }

  // Start the next round
  next_round() {
    this.deal_cards();
  }

  removePlayer(player) {
    player.game_id = null;
    this.players = this.players.filter(p => p.id != player.id);
  }

  join(player) {
    console.log("Join game ", this.id, "with player id:", player.id);
    if (this.players.length == this.max_players) {
      console.log("ERROR: Maximum User reached for this game.");
      throw "Maximum users reached";
    }

    if (this.players.find(p => p.id == player.id)) {
      console.log("Dublicate user found. Can not join twice with id ", player.id);
      return;
    }

    player.game_id = this.id;
    this.players.push(player);
  }
}
