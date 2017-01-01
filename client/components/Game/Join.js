import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

export default class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      gameid: null,
      password: null
    };
  }

  handleChange(event) {
    let key = event.target.id
    console.log(key);
    if (key == 'gameid') {
      this.setState({ gameid: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.gameid + '?' + this.state.password);
    this.context.socket.emit('game.join', { game_id: this.state.gameid, password: this.state.password }, (_, error) => {
      if (error) {
        alert(error);
        console.log(error);
        return;
      }
      browserHistory.push('/game/play/' + this.state.gameid);

    });
  }

  render() {
    return <div className="col-md-6 col-md-offset-3">

      <form className="form-horizontal" onSubmit={::this.onSubmit}>
        <fieldset>

        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="gameid">Game ID</label>
          <div className="col-md-4">
            <input id="gameid" name="gameid" type="text" value={this.state.value} onChange={::this.handleChange} placeholder="12345" className="form-control input-md" required="" />

          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="password">Password</label>
          <div className="col-md-4">
            <input id="password" name="password" type="password" value={this.state.value} onChange={::this.handleChange} placeholder="Empty if no password" className="form-control input-md" required="" />

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

Join.contextTypes = {
  socket: React.PropTypes.object
};