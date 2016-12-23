
/**
   * @constructor
   * @param {id}   The player id
   * @param {name} player name
   * @param {avatar} name of the avatar file name
   */
export default class Player {
    constructor(id, name, avatar) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.game_id = 0;
        this.rank = 0;
        this.cards = [];
        this.active = true;
        this.extradata = {};
    }
}
