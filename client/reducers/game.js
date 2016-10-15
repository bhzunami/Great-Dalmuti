export default function (state = {}, action) {
  switch (action.type) {
    case 'GAME_SERVERUPDATE':
      return Object.assign({}, state, action.data);

    default:
      return state;
  }
}