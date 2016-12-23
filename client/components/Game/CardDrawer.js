import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'


export default function CardDrawer({cardRank, callback}) {
  function onClick() {
    // todo: transition animation
    callback();
  };

  const cards = [].fill.call({ length: CARD_SET.length }, <Card rank={cardRank} onClick={onClick} />);

  // return <div id="carddrawer" style={{ position: "absolute", top: "50%", left: "50%" }}>{cards[0]}</div>;
  return <div id="carddrawer"><button onClick={onClick}>This is a random card you can click on!</button></div>
};