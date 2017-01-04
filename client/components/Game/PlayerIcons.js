import cx from 'classnames'

// shows the player icons and names on the table. 
// positioned automatically around the oval table depending on number of players.
// the current player is always on the bottom center.

export default function PlayerIcons({game, player}) {
  // dimensions of the table
  const width = 1000
    , height = 600
    , step = (2 * Math.PI) / game.max_player;

  let angle = Math.PI / 2;

  // get current player position from the list, so we can position the player on the bottom center
  const myPosition = game.player_ranks.indexOf(player.id);

  // player ordering is according to ranking from card drawing or last round
  const greatDalmuti = game.player_ranks[0];
  const smallDalmuti = game.player_ranks[1];
  const greatButler = game.player_ranks[game.player_ranks.length - 1];
  const smallButler = game.player_ranks[game.player_ranks.length - 2];

  return <div id="playerIcons">
    {Array.apply(null, { length: game.max_player }).map((elm, idx) => {
      // we created an array with max_player positions, and now fill it with the icons

      // placement magic
      // original code from here: http://stackoverflow.com/questions/10152390/dynamically-arrange-some-elements-around-a-circle
      // with some improvements to make it work with an oval shape
      const x = Math.round(width / 2 + (width / 2) * Math.cos(angle) - 100 / 2);
      const y = Math.round(height / 2 + (height / 2) * Math.sin(angle) - 100 / 2);
      angle += step;

      // don't display anything if not enough players have joined yet
      if (idx >= game.allplayers.length) {
        return null;
      }

      // the player we want to display now
      const idxOffset = (idx + myPosition) % game.allplayers.length;
      const player = game.allplayers.find(p => p.id == game.player_ranks[idxOffset]);

      // the player icon, name and dalmuti icon are returned now
      return <div key={idx}
        className={cx({
          "field": true,
          "currentPlayer": game.next_player == player.id && game.started,
          "greatDalmuti": greatDalmuti == player.id && game.started,
          "smallDalmuti": smallDalmuti == player.id && game.started,
          "greatButler": greatButler == player.id && game.started,
          "smallButler": smallButler == player.id && game.started,
        })} style={{ left: x, top: y }}>
        <img src={player.avatar} width="100px" />
        <div className="name">{player.name}</div>
        {game.players[player.id].finished && <span className="glyphicon glyphicon-ok"></span>}
      </div>;
    })}
  </div >;
}