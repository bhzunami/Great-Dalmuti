import 'bootstrap-loader';

import './App.scss';

import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'


import Index from './Index';
import Profile from './Profile';
import Layout from './Layout';
import Game from './Game';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute path="" component={Index}/>
      <Route path="profile" component={Profile}/>
      <Route path="game/join" component={Game.Join}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
