
export default function FinishedGame({game, nextRoundClicked}) {
  if (game.allplayers.length == 0) return null;

  return <div>
    <h1>Game finished!</h1>
    <h2>Ranking:</h2>
    <ol>
      {game.finished_players.map(pid => <li key={pid}>{(game.allplayers.find(p => p.id == pid) || { name: "notfound" }).name}</li>)}
    </ol>
    <button className="btn btn-primary" onClick={nextRoundClicked}>Next round!</button>
  </div>;
};


// WEBPACK FOOTER //
// ./client/components/Game/FinishedGame.js