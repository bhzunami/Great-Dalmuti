import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

// display cards from where the player can choose one card.
// the start order is predetermined on the server, so this is just a fake display

export default class CardDrawer extends React.Component {

  constructor(props) {
    super(props);
    // initial state
    this.state = {
      drawStage: 0
    }
  }

  clickedCard() {
    // when a card is clicked, go to next stage of drawing
    this.setState({ drawStage: 1 });
  }

  render() {
    const cardRank = this.props.cardRank;

    if (this.state.drawStage == 0) {
      // first, display some cards from which the player can choose
      return <div id="cardDrawer">
        <h2>Please pick a card</h2>
        <div className="cards">
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
          <Card rank={cardRank} onClick={::this.clickedCard} hidden={true} />
        </div>
      </div>
    } else {
      // then, display the "chosen" card value
      return <div id="cardDrawer">
        <div className="singleCard">
          <Card rank={cardRank} />
        </div>
        <div><button onClick={::this.props.callback}>OK</button></div>
      </div >
    }
  }
}