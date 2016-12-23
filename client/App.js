import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'

// Twitter Bootstrap init
import 'bootstrap-loader';

// CSS files
import './App.scss';

// more stuff
import reducers from './reducers'
import { updatePlayerData } from './actions'
import socket from './socket'

// Components
import Index from './components/Index';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Game from './components/Game';
import About from './components/About';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const history = syncHistoryWithStore(browserHistory, store);


socket.emit('player.self', (playerdata) => {
  store.dispatch(updatePlayerData(playerdata));
});

// routing & render
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout} socket={socket}>
        <IndexRoute path="" component={Index} />
        <Route path="profile" component={Profile} />
        <Route path="about" component={About} />
        <Route path="game" component={Game.Game}>
          <Route path="join" component={Game.Join} />
          <Route path="new" component={Game.New} />
          <Route path="play/:id" component={Game.Play} />

        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
