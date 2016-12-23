import cx from 'classnames'

import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

import './PlayerHand.scss'

export default class PlayerHand extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCardsIdx: [] };
  }

  cardClick(idx) {
    return () => {
      console.log("clicked card", idx);

      const arrIdx = this.state.selectedCardsIdx.indexOf(idx);

      if (arrIdx > -1) {
        const arr = this.state.selectedCardsIdx.slice();
        arr.splice(arrIdx, 1);
        this.setState({
          selectedCardsIdx: arr
        })
      } else {
        this.setState({
          selectedCardsIdx: this.state.selectedCardsIdx.concat([idx])
        });
      }
    }
  }

  render() {
    const {cards, onPlayClick} = this.props;
    const selectedCardsIdx = this.state.selectedCardsIdx;

    const selection = selectedCardsIdx.length > 0;
    let currentCardVal = 0;

    if (selection) {
      currentCardVal = cards[selectedCardsIdx[0]];
    }

    const playClick = () => {
      onPlayClick(selectedCardsIdx.map(idx => cards[idx]));

      this.setState({ selectedCardsIdx: [] });
    };

    return <div><div id="PlayerHand">
      {cards.map((card, idx) => <div key={idx} className={cx({ "selected": (selectedCardsIdx.indexOf(idx) > -1), "disabled": selection && card != currentCardVal })}><Card rank={card} onClick={::this.cardClick(idx)} /></div>)}
    </div>
      <button onClick={playClick}>Passen/Karten spielen</button>
    </div>;
  }
};


// WEBPACK FOOTER //
// ./client/components/Game/PlayerHand.js