import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

// Twitter Bootstrap init
import 'bootstrap-loader';

// CSS files
import './App.scss';

// Components
import Index from './components/Index';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Game from './components/Game';

let store = createStore(reducers);

// routing & render
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute path="" component={Index} />
        <Route path="profile" component={Profile} />
        <Route path="game/join" component={Game.Join} />
        <Route path="game/new" component={Game.New} />
        <Route path="game/play/:id" component={Game.Play} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
