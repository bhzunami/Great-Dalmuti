import { RANKS, CARD_URLS } from './../../../models/Cards'

export default function Card({rank, onClick, hidden}) {

  const src = hidden ? CARD_URLS.hidden : CARD_URLS[rank];

  return <div><img src={src} width="250px" /></div>;
};