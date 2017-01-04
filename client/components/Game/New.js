import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { getFormData } from './../../helpers'

// create a new game

export default class New extends React.Component {
  onSubmit(e) {
    e.preventDefault(); // suppress standard form action, we use web sockets!

    // get form data
    const game = getFormData('gameform');

    // send data to server, create game
    this.context.socket.emit('game.create', game, (gamedata, error) => {
      // show error if there is one
      if (error) {
        alert("an error happened :( " + JSON.stringify(error));
        return;
      }
      this.props.updateGameData(gamedata);

      // join creator to the game
      this.context.socket.emit('game.join', { game_id: gamedata.id }, () => {
        browserHistory.push('/game/play/' + gamedata.id);
      });
    });
  }
  render() {
    // display html form
    return <div className="col-md-6 col-md-offset-3">

      <h1>Create new game</h1>

      <form className="form-horizontal" id="gameform" onSubmit={::this.onSubmit}>
        <fieldset>
        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="name">Game Name</label>
          <div className="col-md-8">
            <input id="name" name="name" type="text" placeholder="My Game" className="form-control input-md" required="" />

          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="max_player">Max Players</label>
          <div className="col-md-8">
            <select id="max_player" name="max_player" className="form-control">
              <option value="4">4 Players</option>
              <option value="5">5 Players</option>
              <option value="6">6 Players</option>
              <option value="7">7 Players</option>
              <option value="8">8 Players</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-3 control-label" htmlFor="passcode">Passcode</label>
          <div className="col-md-8">
            <input id="passcode" name="passcode" type="password" placeholder="Optional; restrict who can enter" className="form-control input-md" />

          </div>
        </div>

        <div className="form-group">
          <div className="col-md-8 col-md-offset-3">
            <button type="button" className="btn btn-success">Create Game</button>
          </div>
        </div>
      </fieldset>
      </form >
    </div >
  }
}

New.contextTypes = {
  socket: React.PropTypes.object
};
