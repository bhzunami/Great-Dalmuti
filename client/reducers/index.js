import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import game from './game'
import player from './player'

export default combineReducers({
  game,
  player,
  routing: routerReducer,
});
