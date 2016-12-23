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
    game.finished = false;
    game.started = false;
    game.players = {};
    game.player_ranks = [];
    game.next_player;
    game.round = 0;
    game.last_played_cards = [];
    game.last_played_player;
    game.finished_players = [];

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

    Object.keys(this.players).forEach(p_id => this.players[p_id].cards.sort((a, b) => a - b));
  }

  /**
   * When user plays a card
   */
  play_card(player_id, cards) {
    if (cards.length == 0) {
      // player has passed
      this.players[player_id].passed = true;
      this.update_next_player();
      this.check_round_finished();
      return;
    }

    const player_cards = this.players[player_id].cards

    if (player_cards.length < cards.length) {
      throw "More cards are played";
    }
    const number = cards[0];

    // update last_played_cards
    this.last_played_cards = cards;
    this.last_played_player = player_id;

    // Remove the played cards from player
    const start = player_cards.indexOf(number);
    player_cards.splice(start, cards.length);
    if (player_cards.length == 0) {
      this.players[player_id].finished = true;
      this.finished_players.push(player_id);
    }

    this.update_next_player();

    this.check_game_finished();
  }

  update_next_player(last_player = null) {
    // set the player before last_player, so we can use the do while() neatly
    if (last_player != null) {
      this.next_player = this.player_ranks[((this.player_ranks.indexOf(last_player) - 1) % this.player_ranks.length)];
    }

    // get current player index, and select next player index, write to next_player
    do {
      this.next_player = this.player_ranks[((this.player_ranks.indexOf(this.next_player) + 1) % this.player_ranks.length)];
    } while (this.players[this.next_player].finished);
  }

  check_game_finished() {
    if (this.players.filter(p => !p.finished) == 1) {
      // game is finished
      this.finished = true;
    }
  }

  check_round_finished() {
    if (Object.keys(this.players).every(p => this.players[p].passed || this.players[p].finished)) {
      // new round
      Object.keys(this.players).forEach(p => this.players[p].passed = false);
      this.update_next_player(this.last_played_player);
      this.last_played_cards = [];
    }
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
    this.players[player.id] = { rank: 0, points: 0, cards: [], extradata: {}, passed: false, finished: false };
    this.player_ranks.push(player.id);
  }
}
