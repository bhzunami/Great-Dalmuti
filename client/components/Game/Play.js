import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import './Play.scss'

import CardDrawer from './CardDrawer'
import PlayerHand from './PlayerHand'
import FinishedGame from './FinishedGame'
import Card from './Card'

function errorCallback(_, error) {
  if (error) {
    alert(error);
    console.log(error);
  }
}

function distributeFields() {
  var radius = 200;
  var fields = $('.field'), container = $('#table'),
    width = container.width(), height = container.height(),
    angle = 0, step = (2 * Math.PI) / fields.length;

  fields.each((field) => {
    var x = Math.round(width / 2 + radius * Math.cos(angle) - $(field).width() / 2);
    var y = Math.round(height / 2 + radius * Math.sin(angle) - $(field).height() / 2);

    console.log($(field).text(), x, y, field);

    $(field).css({
      left: x + 'px',
      top: y + 'px'
    });
    angle += step;
  });
}


export default class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };

  }
  componentDidMount() {
    // listen on game updates
    this.context.socket.on(this.props.params.id, this.props.updateGameData);

    // join game, get data
    this.context.socket.emit('game.join', this.props.params.id, () => { });
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


    // draw player icons
    const width = 1000
      , height = 600
      , step = (2 * Math.PI) / game.max_player;

    let angle = Math.PI / 2;

    const myPosition = game.player_ranks.indexOf(player.id);

    const playerIcons = Array.apply(null, { length: game.max_player }).map((elm, idx) => {
      const x = Math.round(width / 2 + (width / 2) * Math.cos(angle) - 100 / 2);
      const y = Math.round(height / 2 + (height / 2) * Math.sin(angle) - 100 / 2);

      angle += step;

      if (idx >= game.allplayers.length) {
        return null;
      }

      const idxOffset = (idx + myPosition) % game.allplayers.length;
      const player = game.allplayers.find(p => p.id == game.player_ranks[idxOffset]);
      const currentPlayer = game.next_player;

      return <div key={idx} className={"field " + (currentPlayer == player.id ? "currentPlayer" : "")} style={{ left: x, top: y }}>
        <img src={player.avatar} width="100px" />
        <div className="name">{player.name}</div>
        {game.players[player.id].finished && <span className="glyphicon glyphicon-ok"></span>}
      </div>;
    });
    // end draw player icons


    if (!player.id || !game.name) {
      return <div>Loading...</div>;
    }

    const tableCardsWidth = 96 + (game.last_played_cards.length - 1) * 46;

    return <div>
      <h1>Play game {this.props.params.id}: {game.name}</h1>
      <div id="table">
        {playerIcons}
        {game.finished && <FinishedGame game={game} nextRoundClicked={::this.nextRoundClicked} />}
        {!game.started && game.max_player == Object.keys(game.players).length && <button type="button" id="startbutton" onClick={::this.startGame}>Start Game!</button>}
        {game.started && !game_player.extradata.cardDrawn && <CardDrawer cardRank={player.rank} callback={::this.cardDrawn} />}
        <div id="cardsOnTable" style={{ width: tableCardsWidth }}>{game.last_played_cards.map((c, idx) => <Card rank={c} key={idx} />)}</div>
      <div id="oval"></div>
    </div>
      <div id="showPlayerCards">{game.started && game_player.extradata.cardDrawn && <PlayerHand cards={game_player.cards} onPlayClick={::this.onPlayClick} buttonEnabled={game.next_player == player.id} cardsOnTable={game.last_played_cards} />}</div>
      <h3>Game data</h3>
      <pre>{JSON.stringify(game, null, 4)}</pre>
      <h3>Current Player</h3>
      <h4>{player.name}</h4>
      <img src={player.avatar} />
    </div >
  }
}

Play.contextTypes = {
  socket: React.PropTypes.object
};



// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js


// WEBPACK FOOTER //
// ./client/components/Game/Play.js