import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { updateGameData } from './../../actions'

class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      gameid: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    this.setState({ gameid: event.target.value });
  }

  onClick() {
    console.log(this.state);

    this.context.socket.emit('game.join', this.state.gameid, (gamedata, error) => {
      console.log(gamedata, error);
      if (error) {
        alert("an error happened :( " + JSON.stringify(error));
        return;
      }

      this.props.updateGameData(gamedata);

      browserHistory.push('/game/play/' + this.state.gameid);
    });
  }

  render() {
    return <div className="col-md-6 col-md-offset-3">

      <form className="form-horizontal">
        <fieldset>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="gameid">Game ID</label>
            <div className="col-md-4">
              <input id="gameid" name="gameid" type="text" value={this.state.value} onChange={this.handleChange} placeholder="12345" className="form-control input-md" required="" />

            </div>
          </div>

          <div className="form-group">
            <div className="col-md-4 col-md-offset-4 ">
              <button id="joingame" name="joingame" className="btn btn-success" type="button" onClick={this.onClick}>Join Game</button>
            </div>
          </div>

        </fieldset>
      </form>

    </div>
  }
}

Join.contextTypes = {
  socket: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    player: state.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: (data) => {
      dispatch(updateGameData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
