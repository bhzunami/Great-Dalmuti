import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

export default class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      gameid: null
    };

  }

  handleChange(event) {
    this.setState({ gameid: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    browserHistory.push('/game/play/' + this.state.gameid);
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
