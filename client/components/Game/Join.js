import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { getFormData } from './../../helpers'

// shows the join game form

export default class Join extends React.Component {
  constructor() {
    super();
    // initial state
    this.state = {
      gameid: null,
      password: null
    };
  }

  handleChange(event) {
    let key = event.target.id

    if (key == 'gameid') {
      this.setState({ gameid: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }

  // submit form
  onSubmit(e) {
    e.preventDefault(); // suppress standard form action, we use web sockets!

    // get data
    const data = getFormData('gameform');

    // send to server
    this.context.socket.emit('game.join', data, (_, error) => {
      // display error if there is one
      if (error) {
        alert(error);
        console.log(error);
        return;
      }

      // or go to the game
      browserHistory.push('/game/play/' + this.state.gameid);

    });
  }

  render() {
    // display form for joining the game
    return <div className="col-md-6 col-md-offset-3">
      <h1>Join Game</h1>
      <form className="form-horizontal" onSubmit={::this.onSubmit} id="joinGameForm">
        <fieldset>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="gameid">Game ID</label>
          <div className="col-md-5">
            <input id="game_id" name="game_id" type="text" placeholder="12345" className="form-control input-md" />

          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="password">Password</label>
          <div className="col-md-5">
            <input id="password" name="password" type="password" placeholder="Empty if no password" className="form-control input-md" />

          </div>
        </div>

        <div className="form-group">
          <div className="col-md-4 col-md-offset-4 ">
            <button id="joingame" name="joingame" className="btn btn-success">Join Game</button>
          </div>
        </div>

      </fieldset>
      </form>

    </div >
  }
}

// we use web sockets on this page
Join.contextTypes = {
  socket: React.PropTypes.object
};