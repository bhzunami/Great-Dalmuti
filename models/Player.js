
const card_set = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13]

export default class Player {
  constructor(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.points = 0;
    this.game_id = 0;
    this.rank = 0;
    this.card_set = []
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
    return this.card_set;
  }

  // Draw a card for the start of the game
  draw_start() {
    return Math.floor(Math.random() * 12) + 1;
  }

}
