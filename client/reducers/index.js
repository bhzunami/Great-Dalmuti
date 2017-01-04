import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import game from './game'
import player from './player'

/**
 * Redux store http://redux.js.org/
 * 
 * This store holds the global state in the browser. Basically a volatile database for the browser.
 * 
 * Here we hold data about the current game (if one was started), the current player, and some routing infos (current page, parameters)
 * 
 * The state can't be directly manipulated. Changes in the store are made through reducer functions. When called, they update part of the state, which returns a new state object, which in turn propagates to all affected react components and updates them.
 * 
 */

export default combineReducers({
  game,
  player,
  routing: routerReducer,
});
