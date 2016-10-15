import { Link, browserHistory } from 'react-router'

export default class Join extends React.Component {
  constructor() {
    super();
    this.state = {
      gameid: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({gameid: event.target.value});
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
              <Link to={"/game/play/" + this.state.gameid} id="joingame" name="joingame" className="btn btn-success">Join Game</Link>
            </div>
          </div>

        </fieldset>
      </form>

    </div>
  }
}