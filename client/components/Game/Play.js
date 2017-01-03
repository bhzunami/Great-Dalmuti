import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import './Play.scss'

import CardDrawer from './CardDrawer'
import PlayerHand from './PlayerHand'
import FinishedGame from './FinishedGame'
import PlayerIcons from './PlayerIcons'
import Card from './Card'
import Chat from './../Chat'

function errorCallback(_, error) {
  if (error) {
    alert(error);
    console.log(error);
  }
}

export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };

  }
  componentDidMount() {
    // listen on game updates
    this.context.socket.on(this.props.params.id, this.props.updateGameData);

    // get data
    this.context.socket.emit('game.initsockets');
    this.context.socket.emit('game.get', this.props.params.id, this.props.updateGameData);
  }

  startGame() {
    this.context.socket.emit('game.start', errorCallback);
  }

  cardDrawn() {
    this.props.updatePlayerExtraData({ cardDrawn: true });
  }

  onPlayClick(cards) {
    this.context.socket.emit('game.card_played', cards, errorCallback);
  }

  nextRoundClicked() {
    this.context.socket.emit('game.new_game', errorCallback);
  }

  render() {
    const {game, player} = this.props;
    if (!game.id) return null; // game did not load yet

    const game_player = game.players[player.id];

    if (!player.id || !game.name) {
      return <div>Loading...</div>;
    }

    const tableCardsWidth = 96 + (game.last_played_cards.length - 1) * 46;

    return <div>
      <h1>Play game {this.props.params.id}: {game.name}</h1>
      <div id="table">
        <div id="oval">
          <div id="oval2"></div>
        </div>
        <PlayerIcons game={game} player={player} />
        {!game.started && game.max_player == Object.keys(game.players).length && <button type="button" id="startbutton" onClick={::this.startGame}>Start Game!</button>}
        {game.started && !game_player.extradata.cardDrawn && <CardDrawer cardRank={game_player.rank} callback={::this.cardDrawn} />}
        <div id="cardsOnTable" style={{ width: tableCardsWidth }}>{game.last_played_cards.map((c, idx) => <Card rank={c} key={idx} />)}</div>
      {game.finished && <FinishedGame game={game} nextRoundClicked={::this.nextRoundClicked} />}

    </div>

      <div id="showPlayerCards">{game.started && game_player.extradata.cardDrawn && <PlayerHand cardsOnHand={game_player.cards} onPlayClick={::this.onPlayClick} buttonEnabled={game.next_player == player.id} cardsOnTable={game.last_played_cards} />}</div>

      <Chat game_id={game.id} player_id={player.id} />
    </div >
  }
}

Play.contextTypes = {
  socket: React.PropTypes.object
};
