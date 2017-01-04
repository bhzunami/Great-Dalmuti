import { RANKS, CARD_URLS } from './../../../models/Cards'

// displays a card

export default function Card({rank, onClick, hidden}) {
  // display backside if hidden
  const src = hidden ? CARD_URLS.hidden : CARD_URLS[rank];

  return <div><img src={src} onClick={onClick} /></div>;
};