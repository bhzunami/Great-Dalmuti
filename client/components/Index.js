import { Router, Route, Link, browserHistory } from 'react-router'



export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: 0,
      active_players: 0,
      inactive_players: 0
    };

  }

  componentDidMount() {

    this.context.socket.emit('lobby.info', this.props.params.id, (data) => {
      console.log(data);
      this.setState({
        games: data.games,
        active_players: data.active_players,
        inactive_players: data.inactive_players
      });
    });
  }

  render() {
    return <div>
      <div className="starter-template">
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