export function updatePlayerData(data) {
  return {
    type: 'PLAYER_UPDATE',
    data
  };
}

export function updateGameData(data) {
  return {
    type: 'GAME_SERVERUPDATE',
    data
  };
}
