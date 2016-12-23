export default function (state = {}, action) {
  switch (action.type) {
    case 'GAME_SERVERUPDATE':
      // on server update, sort cards
      Object.keys(action.data.players).forEach(p => {
        action.data.players[p].cards = action.data.players[p].cards.slice().sort((a, b) => a - b);
      });
      return Object.assign({ allplayers: [] }, state, action.data);

    case 'GAME_PLAYERS':
      return Object.assign({ allplayers: [] }, state, { allplayers: action.players });
    default:
      return state;
  }
}
