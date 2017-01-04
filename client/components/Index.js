import { Router, Route, Link, browserHistory } from 'react-router'

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    // default state
    this.state = {
      games: 0,
      active_players: 0,
      inactive_players: 0
    };

  }

  componentDidMount() {
    // on mount, get current lobby data
    this.context.socket.emit('lobby.info', (data) => {
      this.setState(data);
    });
  }

  render() {
    return <div>
      <div className="index-page">
        <div><img src="static/logo.png" /></div>
        <p className="lead">Funny card game for up to 8 players.</p>

        <p> Active Games: {this.state.games}.<br />
          Active Players: {this.state.active_players}<br />
          Players total: {this.state.active_players + this.state.inactive_players}</p>
        <Link to="/profile" className="btn btn-primary">Go to lobby</Link>
      </div>
    </div>
  }
}


Index.contextTypes = {
  socket: React.PropTypes.object
};