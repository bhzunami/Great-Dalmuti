import { Link, browserHistory } from 'react-router'

import { connect } from 'react-redux'

class Play extends React.Component {
  render() {
    const {game, player} = this.props;
    console.log(game, player);
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

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);
