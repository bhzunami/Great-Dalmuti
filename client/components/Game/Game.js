import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { updateGameData } from './../../actions'

class Game extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {
      player: this.props.player,
      game: this.props.game,
      updateGameData: this.props.updateGameData,
    });
  }
}

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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
