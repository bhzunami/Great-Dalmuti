// reducers for the player state
export default function (state = {}, action) {
  switch (action.type) {
    case 'PLAYER_UPDATE':
      return Object.assign({ localdata: {} }, state, action.data);
    case 'PLAYER_LOCALDATA':
      return Object.assign({ localdata: {} }, state, { localdata: action.data });
    default:
      return state;
  }
}