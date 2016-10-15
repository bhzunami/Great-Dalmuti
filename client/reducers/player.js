export default function (state = {}, action) {
  switch (action.type) {
    case 'PLAYER_UPDATE':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}