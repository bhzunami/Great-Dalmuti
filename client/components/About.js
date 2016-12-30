
export default class About extends React.Component {

    render() {
        return <div>
            <h1>About</h1>
            This is a web game for the EIPR-Modul from the FHNW.
            <h2>The great Dalmuti</h2>
            It is easy to learn and quick to play. It’s best with five to eight players, though you can play with four people. The faster you get rid of your cards, the higher your social class will be in the following hand. Since your social class is indicated by your seating, each hand ends with players changing seats to reflect the new social order. The Great Dalmuti
            card game is fun for just about anyone over eight years old.
            <br />
            <h2>Rules</h2>
            <p>
                The number on a card is called its rank. The lower the rank, the better the card. For example, the Baroness (4) is better than the Abbess (5). A card’s rank also tells you how many cards of its type are in the deck. The only exceptions are the two Jesters, which are 3 a type of wild card. A Jester played alone counts as a card with rank 13—worse than even the Peasants (12) but when played along with one or more other cards, Jesters take on the rank of the other cards.
            </p>
            <h3>The Cards</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Rankg</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Jester (alone)</td>
                        <td>13</td>
                    </tr>
                    <tr>
                        <td>Peasants</td>
                        <td>12</td>

                    </tr>
                    <tr>
                        <td>Stonecutter</td>
                        <td>11</td>

                    </tr>
                    <tr>
                        <td>Shepherdess</td>
                        <td>10</td>

                    </tr>
                    <tr>
                        <td>Cook</td>
                        <td>9</td>

                    </tr>
                    <tr>
                        <td>Seamstress</td>
                        <td>8</td>

                    </tr>
                    <tr>
                        <td>Knight</td>
                        <td>6</td>
                    </tr>

                    <tr>
                        <td>Abbess</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>Baroness</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Earl Marshal</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Archbishop</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>The Great Dalmuti </td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
            <p>
                In each hand of The Great Dalmuti card game, the object is to get rid of your cards as soon as you can. The faster you get rid of your cards, the higher your social class will be in the following hand.
                </p>
            <h3>The Play</h3>
            <p>Each hand starts when the player who has the lead plays a set of cards of the same rank face up. A set is simply one or more cards. The Greater Dalmuti has the lead in the first hand, and then play proceeds clockwise. On his or her turn, each player can either play a set of the same number of cards of better rank or pass. (Remember, the lower the rank, the better the card.) A player who chooses to pass may still play later in the hand, when it’s his or her turn again. Play continues clockwise until everyone passes in a row. This ends the hand, and the Greater Peon collects the played cards and puts them aside. The player who made the last play then gets the lead for the next hand.</p>
            <p>
                A player who has played his or her last card is said to have gone out. The first player who goes out wins thehand and becomes the Greater Dalmuti for the next hand. The second person to go out becomes the Lesser Dalmuti and sits to the left of the Greater Dalmuti, and so on around the playing area. After a player goes out, play continues clockwise as usual. If no one plays a better set, then the lead passes clockwise to the next player who still has cards.</p>
            <p />
        </div>;
    }

}