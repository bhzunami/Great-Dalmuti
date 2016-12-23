import cx from 'classnames'

import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

import './PlayerHand.scss'

export default function PlayerHand({cards, selectedCardsIdx, onPlayClick}) {

  const selection = selectedCardsIdx.length > 0;
  let currentCardVal = 0;

  const cardClick = (idx) => () => {
    console.log("clicked card", idx);
    cardClickedCallback(idx);
  };
  if (selection) {
    currentCardVal = cards[selectedCardsIdx[0]];
  }

  return <div><div id="PlayerHand">
    {cards.map((card, idx) => <div key={idx} className={cx({ "selected": (selectedCardsIdx.indexOf(idx) > -1), "disabled": selection && card != currentCardVal })}><Card rank={card} /></div>)}
  </div>
    <button onClick={onPlayClick}>Passen/Karten spielen</button>
  </div>
};