import cx from 'classnames'

import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

import './PlayerHand.scss'

export default class PlayerHand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCardsIdx: []
    };
  }

  onCardClicked(cardIdx) {
    const card = this.props.cardsOnHand[cardIdx];
    const cardsNum = this.props.cardsOnTable.length;

    return (event) => {
      // checks
      const otherIdx = this.state.selectedCardsIdx[0];

      // if card is same value or lower
      if ((card >= this.props.cardsOnTable[0] && card != 13) || (card == 13 && (otherIdx === undefined && cardsNum != 0))) {
        event.stopPropagation();
        return false;
      }

      // if card is not same value as prev. selected (except joker)
      if (card != 13 && otherIdx !== undefined && this.props.cardsOnHand[otherIdx] !== card) {
        event.stopPropagation();
        return false;
      }

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

  render() {
    const {cardsOnHand, onPlayClick, buttonEnabled, cardsOnTable} = this.props;
    const selectedCardsIdx = this.state.selectedCardsIdx;

    const selection = selectedCardsIdx.length > 0;
    let currentCardVal = 0;

    if (selection) {
      currentCardVal = cardsOnHand[selectedCardsIdx[0]];
    }

    const playClick = () => {
      if (!buttonEnabled) return;

      onPlayClick(selectedCardsIdx.map(idx => cardsOnHand[idx]));

      this.setState({ selectedCardsIdx: [] });
    };

    const buttonName = selectedCardsIdx.length == 0 ? "Pass" : "Play card(s)";
    const buttonCheck = buttonEnabled && (selectedCardsIdx.length == cardsOnTable.length || selectedCardsIdx.length == 0 || cardsOnTable.length == 0);

    return <div><div id="PlayerHand">
      {cardsOnHand.map((card, idx) => <div key={idx} onClick={::this.onCardClicked(idx)} className={cx({ "selected": (selectedCardsIdx.indexOf(idx) > -1), "disabled": selection && card != currentCardVal && card != 13 })}><Card rank={card} /></div>)}
    </div>
      <button onClick={playClick} className="btn btn-primary" disabled={!buttonCheck}>{buttonName}</button>
    </div >
  }
};
