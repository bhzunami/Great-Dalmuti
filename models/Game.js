export default class Game {
  constructor(creator, id, max_player=4, password="") {
    this.creator = creator;
    this.id = id;
    this.max_player = max_player;
    this.password = password;
    this.finish = false;
    this.players = [creator];
  }


  removePlayer(player) {
    this.players = this.players.filter(p => p.id != player.id);
  }
}