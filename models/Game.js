import { getCardsShuffled } from './Cards';

/**
 * Class representing a Game.
 *
 * @class Game
 */

/**
 * @constructor
 */
export default class Game {
  constructor(gameData) {
    Object.assign(this, gameData);
  }

  /**
   * @param {Player} creator - The creator of the game
   * @param {Dict} - Optional parameters:
   *               - max player: how many players are allowed in this game
   *               - passcode: Protect the game with a passcode
   *               - Name of the game
   */
  static createGame(creator, {max_player = 4, passcode = "", name = ""}) {
    const game = new Game();

    game.creator = creator;
    // Generate a game id with with a length of 5
    game.id = Math.floor(Math.random() * (10 ** 5 - 10 ** 4) + 10 ** 4);
    game.name = name;
    game.max_player = parseInt(max_player, 10);
    game.passcode = passcode;
    game.finish = false;
    game.started = false;
    game.players = {};
    game.player_ranks = []
    game.next_player;
    game.round = 0;
    game.join(creator);

    return game;
  }

  // Draw a card for the start of the game
  // This card is choosen by the player
  static draw_start() {
    return Math.floor(Math.random() * 12) + 1;
  }

  // starts a new game
  start() {
    // check if there are enough player to play game
    if (Object.keys(this.players).length < this.max_player) {
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
    this.player_ranks = Object.keys(this.players).sort((a, b) => this.players[a].rank - this.players[b].rank);
    this.next_player = this.player_ranks[0];
  }

  /**
   * Deal the shuffeld cards person by person
   */
  deal_cards() {
    const cards = getCardsShuffled();
    const player_keys = Object.keys(this.players);

    let i = 0;
    while (cards.length > 0) {
      this.players[player_keys[i]].cards.push(cards.pop());
      i = (i + 1) % this.max_player;
    }
  }


  /**
   * When user plays a card
   */
  play_card(player_id, cards) {
    player_cards = this.players[player].cards
    this.player_cards.sort((a, b) => a - b);

    if (player_cards.length < cards.length) {
      throw "More cards are played";
    }
    number = cards[0];
    // get all cards with this number
    found = player_cards.filter(card => card == number)
    if (found.length < cards.length) {
      throw "You do not have this num of cards";
    }
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
    delete this.players[player.id]
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
      console.log("Duplicate user found. Rejoin ", player.id);
      return;
    }
    // Add player
    player.game_id = this.id;
    this.players[player.id] = { rank: 0, points: 0, cards: [], extradata: {} }
  }
}
