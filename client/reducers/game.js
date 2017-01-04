// reducers for the game state.
export default function (state = {}, action) {
  switch (action.type) {
    case 'GAME_SERVERUPDATE':
      return Object.assign({ allplayers: [] }, state, action.data);

    case 'GAME_PLAYERS':
      return Object.assign({}, state, { allplayers: action.players });
    default:
      return state;
  }
}
