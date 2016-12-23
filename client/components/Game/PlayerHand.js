import cx from 'classnames'

import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

import './PlayerHand.scss'

export default class PlayerHand extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCardsIdx: [] };
  }

  cardClick(cardIdx) {
    const arrIdx = this.state.selectedCardsIdx.indexOf(cardIdx);

    if (arrIdx > -1) {
      const arr = this.state.selectedCardsIdx.slice();
      arr.splice(arrIdx, 1);
      this.setState({
        selectedCardsIdx: arr
      })
    } else {
      this.setState({
        selectedCardsIdx: this.state.selectedCardsIdx.concat([cardIdx])
      });
    }
  }

  disableCheck(cardIdx) {
    const card = this.props.cards[cardIdx];
    const cardsNum = this.props.cardsOnTable.length;

    return (event) => {
      console.log("clicked card", cardIdx, card);

      // checks
      const otherIdx = this.state.selectedCardsIdx[0];

      // if enough cards are selected
      // if (cardsNum == this.state.selectedCardsIdx.length && cardsNum > 0) {
      //   event.stopPropagation();
      //   return false;
      // }


      // if card is same value or lower
      if ((card >= this.props.cardsOnTable[0] && card != 13) || (card == 13 && (otherIdx === undefined && cardsNum != 0))) {
        event.stopPropagation();
        return false;
      }

      // if card is not same value as prev. selected (except joker)
      if (card != 13 && otherIdx !== undefined && this.props.cards[otherIdx] !== card) {
        event.stopPropagation();
        return false;
      }

      this.cardClick(cardIdx);
    }
  }

  render() {
    const {cards, onPlayClick, buttonEnabled, cardsOnTable} = this.props;
    const selectedCardsIdx = this.state.selectedCardsIdx;

    const selection = selectedCardsIdx.length > 0;
    let currentCardVal = 0;

    if (selection) {
      currentCardVal = cards[selectedCardsIdx[0]];
    }

    const playClick = () => {
      if (!buttonEnabled) return;

      onPlayClick(selectedCardsIdx.map(idx => cards[idx]));

      this.setState({ selectedCardsIdx: [] });
    };

    return <div><div id="PlayerHand">
      {cards.map((card, idx) => <div key={idx} onClick={::this.disableCheck(idx)} className={cx({ "selected": (selectedCardsIdx.indexOf(idx) > -1), "disabled": selection && card != currentCardVal && card != 13 })}><Card rank={card} /></div>)}
    </div>
      <button onClick={playClick} className="btn btn-primary" disabled={!buttonEnabled}>Passen / Karten spielen</button >
    </div >;
  }
};


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js