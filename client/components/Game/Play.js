import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import { errorCallback } from './../../helpers'

import './Play.scss'

import CardDrawer from './CardDrawer'
import PlayerHand from './PlayerHand'
import FinishedGame from './FinishedGame'
import PlayerIcons from './PlayerIcons'
import Card from './Card'
import Chat from './../Chat'

// main logic for game play

export default class Play extends React.Component {
  componentDidMount() {
    // listen on game updates
    this.context.socket.on(this.props.params.id, this.props.updateGameData);

    // get data
    this.context.socket.emit('game.initsockets');
    this.context.socket.emit('game.get', this.props.params.id, this.props.updateGameData);
  }

  startGame() {
    // starts a game
    this.context.socket.emit('game.start', errorCallback);
  }

  cardDrawn() {
    // the player has chosen his random card (before first round)
    this.props.updatePlayerExtraData({ cardDrawn: true });
  }

  onPlayCardClick(cards) {
    // the player plays some cards
    this.context.socket.emit('game.card_played', cards, errorCallback);
  }

  nextRoundClicked() {
    // after the current game has finished, start a new game
    this.context.socket.emit('game.new_game', errorCallback);
  }

  render() {
    const {game, player} = this.props;

    // don't display anything until all data was loaded...
    if (!player.id || !game.name) {
      return <div>Loading...</div>;
    }

    // get current players game data
    const game_player = game.players[player.id];

    // calculate posititoning for cards on table
    const tableCardsWidth = 96 + (game.last_played_cards.length - 1) * 46;

    return <div>
      <h1>Play game {this.props.params.id}: {game.name}</h1>
      <div id="table">
        {/* show table background */}
        <div id="oval">
          <div id="oval2"></div>
        </div>
        {/* show player icons */}
        <PlayerIcons game={game} player={player} />
        {/* start game button */}
        {!game.started && game.max_player == Object.keys(game.players).length && <button type="button" id="startbutton" onClick={::this.startGame}>Start Game!</button>}
        {/* shows pseudo random cards to choose from, before the first round */}
      {game.started && !game_player.extradata.cardDrawn && <CardDrawer cardRank={game_player.rank} callback={::this.cardDrawn} />}
        {/* shows the last played cards on the table */}
      <div id="cardsOnTable" style={{ width: tableCardsWidth }}>{game.last_played_cards.map((c, idx) => <Card rank={c} key={idx} />)}</div>
      {/* shows ranking after the game has finished */}
      {game.finished && <FinishedGame game={game} nextRoundClicked={::this.nextRoundClicked} />}

    </div>
    {/* shows the current hand of the player */ }
    <div id="showPlayerCards">{game.started && game_player.extradata.cardDrawn && <PlayerHand cardsOnHand={game_player.cards} onPlayClick={::this.onPlayCardClick} buttonEnabled={game.next_player == player.id} cardsOnTable={game.last_played_cards} />}</div>

    {/* displays the chat window on the bottom right */ }
    <Chat game_id={game.id} player_id={player.id} />
    </div >
  }
}

// we use web sockets on this page
Play.contextTypes = {
  socket: React.PropTypes.object
};
