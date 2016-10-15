import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { updateGameData } from './../../actions'

class Play extends React.Component {

  componentDidMount() {
    console.log(this);
    this.context.socket.on(this.props.game.id, this.props.updateGameData);
  }

  render() {
    const {game, player} = this.props;
    return <div>
      <h1>Play game {this.props.params.id}</h1>
      <h3>Game data</h3>
      <pre>{JSON.stringify(game, null, 4)}</pre>
      <h3>Current Player</h3>
      <h4>{player.name}</h4>
      <img src={player.avatar} />
    </div>
  }
}

Play.contextTypes = {
  socket: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
    player: state.player,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: (event, data) => {
      console.log("gameupdate", event, data);
      dispatch(updateGameData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
