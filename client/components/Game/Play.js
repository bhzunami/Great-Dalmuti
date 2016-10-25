import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'

import './Play.scss'

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

  componentDidMount() {
    this.context.socket.on(this.props.params.id, this.props.updateGameData);

    this.context.socket.emit('game.join', this.props.params.id, () => { });
    this.context.socket.emit('game.get', this.props.params.id, this.props.updateGameData);
  }

  render() {
    let {game, player} = this.props;

    const width = 1000
      , height = 600
      , step = (2 * Math.PI) / game.max_player;

    let angle = Math.PI / 2;

    const fields = Array.apply(null, { length: game.max_player }).map((elm, idx) => {
      const x = Math.round(width / 2 + (width / 2) * Math.cos(angle) - 100 / 2);
      const y = Math.round(height / 2 + (height / 2) * Math.sin(angle) - 100 / 2);

      angle += step;

      return <div key={idx} className="field" style={{ left: x, top: y }}>{idx}</div>;
    });

    if (!player.id || !game.name) {
      return <div>Loading...</div>;
    }

    return <div>
      <h1>Play game {this.props.params.id}: {game.name}</h1>
      <div id="table">
        {fields}
        {!game.started && game.max_player == game.players.length && <button type="button" id="startbutton">Start Game!</button>}
        <div id="oval"></div>
      </div>
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
