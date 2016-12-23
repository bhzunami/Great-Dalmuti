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
   * @param {Dict} - Optional parameters:
   *               - max player: how many players are allowed in this game
   *               - passcode: Protect the game with a passcode
   *               - Name of the game
   */
  constructor(creator, {max_player = 4, passcode = "", name = ""}) {
    this.creator = creator;
    // Generate a game id with with a length of 5
    this.id = Math.floor(Math.random() * (10 ** 5 - 10 ** 4) + 10 ** 4);
    this.name = name;
    this.max_player = parseInt(max_player, 10);
    this.passcode = passcode;
    this.finish = false;
    this.started = false;
    this.players = {};
    this.join(creator);
  }

  // Draw a card for the start of the game
  // This card is choosen by the player
  static draw_start() {
    return Math.floor(Math.random() * 12) + 1;
  }

  // starts a new game
  start() {
    // check if there are enough player to play game
    if (this.players.length < this.max_player) {
      throw "There are not enough player";
    }
    this.assign_ranks();
    this.deal_cards();
    this.started = true;
  }

  /**
   * Every player must have a start rank
   * this method assigns the rank based on the card the 
   * player choosen
   */
  assign_ranks() {
    const assigned_ranks = [];


    Object.keys(this.players).forEach(p_key => {
      let rank = 0;
      do {
        rank = Game.draw_start();
      } while (assigned_ranks.indexOf(rank) > -1)

      assigned_ranks.push(rank);
      this.players[p_key].rank = rank;
    });
  }

  /**
   * Deal the shuffeld cards person by person
   */
  deal_cards() {
    const cards = getCardsShuffled();

    let i = 0;
    player_keys = Object.keys(this.players)
    while (cards.length > 0) {
      this.players[player_keys[i]].cards.push(cards.pop());
      i = (i + 1) % this.max_player;
    }
  }


  /**
   * When user plays a car
   */
  play_card(player_id, cards) {
    player_cards = this.players[player].cards
    if (player_cards.length < cards.length) {
      throw "More cards are played";
    }
    number = cards[0];
    // get all cards with this number
    found = player_cards.filter(card => card == number)
    if (found.length < cards.length) {
      throw "You do not have this num of cards";
    }
    this.player_cards.sort((a, b) => a - b);
    // Remove the played cards from player
    start = player_cards.indexOf(number);
    this.player_cards.splice(start, start + cards.length);
  }


  /**
   *  Start the next round
   */
  next_round() {
    this.deal_cards();
  }

  /**
   * If player disconnect remove the player from game to avoid
   * waiting time
   */
  removePlayer(player) {
    player.game_id = null;
    this.players = this.players.filter(p => p.id != player.id);
  }

  /**
   * Join a new player to the game
   */
  join(player) {
    console.log("Join game ", this.id, "with player id:", player.id);

    // Check if there is a spot left
    if (Object.keys(this.players).length == this.max_players) {
      console.log("ERROR: Maximum User reached for this game.");
      throw "Maximum users reached";
    }
    // Check if the player was still  in game.
    if (this.players[player.id] !== undefined) {
      console.log("Dublicate user found. Can not join twice with id ", player.id);
      return;
    }
    // Add player
    player.game_id = this.id;
    this.players[player.id] = { ranks: 0, cards: [] }
  }
}
