export class Game {
  constructor({creator, id, max_player = 4, password = ""}) {
    this.creator = creator;
    this.id = id;
    this.max_player = max_player;
    this.password = password;

    this.players = [creator];
  }
}