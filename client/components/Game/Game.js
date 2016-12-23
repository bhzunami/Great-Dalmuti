import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { updateGameData, updatePlayerData, updateGamePlayerData } from './../../actions'

class Game extends React.Component {
  componentWillMount() {
    if (!this.props.player.name) {
      browserHistory.push("/Profile");
    }
  }

  render() {
    if (!this.props.player.name) {
      return <div>Loading...</div>;
    }
    return React.cloneElement(this.props.children, {
      player: this.props.player,
      game: this.props.game,
      updateGameData: (data) => {
        this.props.updateGameData(data);
        this.context.socket.emit('game.players', (players) => {
          this.props.updateGamePlayerData(players);
        });
      },
      updatePlayerExtraData: (changedData) => {
        this.context.socket.emit(
          'player.extradata',
          Object.assign({}, this.props.game.players[this.props.player.id].extradata, changedData),
          (game) => this.props.updateGameData(game)
        );
      },
      updatePlayerLocalData: (localdata) => {
        this.props.updatePlayerData({ localdata });
      },
    });
  }
}

Game.contextTypes = {
  socket: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    game: state.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGameData: (data) => {
      dispatch(updateGameData(data))
    },
    updatePlayerData: (data) => {
      dispatch(updatePlayerData(data))
    },
    updateGamePlayerData: (data) => {
      dispatch(updateGamePlayerData(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
