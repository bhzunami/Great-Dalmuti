import cx from 'classnames'

export default function PlayerIcons({game, player}) {
  const width = 1000
    , height = 600
    , step = (2 * Math.PI) / game.max_player;

  let angle = Math.PI / 2;

  const myPosition = game.player_ranks.indexOf(player.id);
  const greatDalmuti = game.player_ranks[0];
  const smallDalmuti = game.player_ranks[1];
  const greatButler = game.player_ranks[game.player_ranks.length - 1];
  const smallButler = game.player_ranks[game.player_ranks.length - 2];

  return <div id="playerIcons">
    {Array.apply(null, { length: game.max_player }).map((elm, idx) => {
      const x = Math.round(width / 2 + (width / 2) * Math.cos(angle) - 100 / 2);
      const y = Math.round(height / 2 + (height / 2) * Math.sin(angle) - 100 / 2);

      angle += step;

      if (idx >= game.allplayers.length) {
        return null;
      }

      const idxOffset = (idx + myPosition) % game.allplayers.length;
      const player = game.allplayers.find(p => p.id == game.player_ranks[idxOffset]);
      const currentPlayer = game.next_player;

      return <div key={idx}
        className={cx({
          "field": true,
          "currentPlayer": currentPlayer == player.id && game.started,
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