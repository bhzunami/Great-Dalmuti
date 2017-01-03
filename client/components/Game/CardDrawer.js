import { CARD_SET, RANKS, CARD_URLS } from './../../../models/Cards'

import Card from './Card'

export default class CardDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawStage: 0
    }
  }

  clickedCard() {
    // todo: transition animation
    //callback();
    this.setState({ drawStage: 1 });
  }

  render() {
    const cardRank = this.props.cardRank;

    if (this.state.drawStage == 0) {

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
      return <div id="cardDrawer">
        <div className="singleCard">
          <Card rank={cardRank} />
        </div>
        <div><button onClick={::this.props.callback}>OK</button></div>
      </div>
    }
  }
}