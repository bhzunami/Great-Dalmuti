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

export function updateGamePlayerData(players) {
  return {
    type: 'GAME_PLAYERS',
    players
  };
}



// WEBPACK FOOTER //
// ./client/actions/index.js