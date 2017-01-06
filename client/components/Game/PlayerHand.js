import cx from 'classnames'

import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

import './PlayerHand.scss'

// displays the current hand of the player

export default class PlayerHand extends React.Component {
  constructor(props) {
    super(props);

    // initial local state
    this.state = {
      selectedCardsIdx: [] // holds the array indexes of the selected cards
    };
  }

  // when a card is clicked, check some rules
  onCardClicked(cardIdx) {
    // this is an initializer function. Each card 
    // get the card
    const card = this.props.cardsOnHand[cardIdx];

    return (event) => {
      // number of cards lying on the table
      const cardsNum = this.props.cardsOnTable.length;

      // check if there's already another card selected
      const otherIdx = this.state.selectedCardsIdx[0];

      // if card is same value or lower than on the table, with special rules for joker (13)
      if ((card >= this.props.cardsOnTable[0] && card != 13) || (card == 13 && (otherIdx === undefined && cardsNum != 0))) {
        event.stopPropagation();
        return false;
      }

      // if card is not same value as prev. selected (except joker)
      if (card != 13 && otherIdx !== undefined && this.props.cardsOnHand[otherIdx] !== card) {
        event.stopPropagation();
        return false;
      }

      // check if card is being selected or deselected, then select or deselect it accordingly
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
  }

  playClick() {
    // called when the player plays his cards (or passes if no card was selected)
    const {cardsOnHand, onPlayClick, buttonEnabled} = this.props;

    if (!buttonEnabled) return;

    // pass the cards to the master function in Play.js
    onPlayClick(this.state.selectedCardsIdx.map(idx => cardsOnHand[idx]));

    // reset selection state
    this.setState({ selectedCardsIdx: [] });
  }

  render() {
    const {cardsOnHand, buttonEnabled, cardsOnTable} = this.props;
    const selectedCardsIdx = this.state.selectedCardsIdx;

    const hasSelection = selectedCardsIdx.length > 0;
    let currentCardVal = 0;

    if (hasSelection) {
      // if a card was selected, get it's value
      currentCardVal = cardsOnHand[selectedCardsIdx[0]];
    }

    const buttonName = selectedCardsIdx.length == 0 ? "Pass" : selectedCardsIdx.length == 1 ? "Play card" : "Play cards";

    // conditionally enable the play button
    const buttonCheck = buttonEnabled && (selectedCardsIdx.length == cardsOnTable.length || selectedCardsIdx.length == 0 || cardsOnTable.length == 0);


    return <div><div id="PlayerHand">
      {cardsOnHand.map((card, idx) => <div key={idx} onClick={::this.onCardClicked(idx)} className={cx({ "selected": (selectedCardsIdx.indexOf(idx) > -1), "disabled": hasSelection && card != currentCardVal && card != 13 })}><Card rank={card} /></div>)}
    </div>
      <button onClick={::this.playClick} className = "btn btn-primary" disabled= {!buttonCheck}>{ buttonName }</button >
    </div >
  }
};
