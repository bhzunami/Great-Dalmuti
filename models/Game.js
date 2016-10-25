import RANKS from './../models/Rank';

const card_set = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13]

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
    this.id = Math.floor(Math.random() * (10 ** 5 - 10 ** 4) + 10 ** 4);;
    this.name = name;
    this.max_player = parseInt(max_player, 10);
    this.passcode = passcode;
    this.finish = false;
    this.started = false;
    this.players = [creator];
    this.card_set = [];
  }

  // modern Fisher–Yates shuffle
  // Link: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  create_card_set() {
    let tmp;
    for (var i = card_set.length; i-- > 1;) {
      let j = Math.floor(Math.random() * card_set.length)
      tmp = card_set[i];
      card_set[i] = card_set[j];
      card_set[j] = tmp;
    }
    this.card_set = card_set;
  }

  // Draw a card for the start of the game
  draw_start() {
    return Math.floor(Math.random() * 12) + 1;
  }

  // This starts a total new game
  start() {
    // if (this.players.length < this.max_player) {
    //   throw "There are not enough player";
    // }
    this.started = true;
    const assigned_ranks = [];
    let rank = 0;
    this.players.forEach(p => {
      while (assigned_ranks.indexOf(rank) >= 0) {
        rank = this.draw_start();
      }
      p.rank = rank;
      this.create_card_set()
    });
    this.deal_cards();
  }

  deal_cards() {
    this.players = this.players.sort((a, b) => a.rank > b.rank);
    let i = 0;
    while (this.card_set.length > 0) {
      this.players[i].cards.push(this.card_set.pop());
    }
  }

  // Start the next round
  next_round() {
    this.players.forEach(p => {
      create_card_set()
      deal_cards();
    });
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
