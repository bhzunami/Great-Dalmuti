/**
 * Redux actions, to modify the store
 * 
 */

// just pass along the current player data
export function updatePlayerData(data) {
  return {
    type: 'PLAYER_UPDATE',
    data
  };
}

// update game data, ensure that cards are sorted
export function updateGameData(data) {
  // sort cards
  Object.keys(data.players).forEach(p => {
    data.players[p].cards = data.players[p].cards.slice().sort((a, b) => a - b);
  });
  return {
    type: 'GAME_SERVERUPDATE',
    data
  };
}

// update player data in the game
export function updateGamePlayerData(players) {
  return {
    type: 'GAME_PLAYERS',
    players
  };
}
