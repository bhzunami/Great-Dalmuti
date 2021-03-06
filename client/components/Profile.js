import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getFormData } from './../helpers'
import { updatePlayerData } from './../actions'

// all available avatars
const avatars = [
  '/static/avatars/man.png',
  '/static/avatars/woman-13.png',
  '/static/avatars/woman-11.png',
  '/static/avatars/man-1.png',
  '/static/avatars/woman-6.png',
  '/static/avatars/woman-2.png',
  '/static/avatars/man-7.png',
  '/static/avatars/woman-4.png',
  '/static/avatars/woman-5.png',
  '/static/avatars/man-6.png',
  '/static/avatars/man-8.png',
  '/static/avatars/man-3.png',
  '/static/avatars/man-5.png',
  '/static/avatars/woman-14.png',
  '/static/avatars/woman-1.png',
  '/static/avatars/woman-10.png',
  '/static/avatars/woman-8.png',
  '/static/avatars/woman-3.png',
  '/static/avatars/woman-7.png',
  '/static/avatars/woman-9.png',
  '/static/avatars/man-4.png',
  '/static/avatars/woman.png',
  '/static/avatars/man-2.png',
  '/static/avatars/woman-12.png',
].sort();

class Profile extends React.Component {
  _validateForm(playerData) {
    if (playerData.name == "") {
      alert("Please provide a name!");
      return false;
    }

    return true;
  }

  _joinGamePressed() {
    this._validateAndContinue("joinGame");
  }

  _createGamePressed() {
    this._validateAndContinue("createGame");
  }

  _validateAndContinue(buttonPressed) {
    // get all inputs
    const playerData = getFormData('profileform');

    // validate
    if (!this._validateForm(playerData)) return;

    // tell the server
    this.context.socket.emit('player.create', playerData, (player, error) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      // update locally
      this.props.updatePlayerData(player);

      // continue to create or join a game
      if (buttonPressed === "createGame") {
        browserHistory.push('/game/new');
      } else {
        browserHistory.push('/game/join');
      }
    });


  }
  render() {
    // wait with display until connection to server is established (done in socket.js)
    if (!this.props.player.id) return <div>Loading...</div>;

    // show lobby/user customisation
    return <div className="col-md-6 col-md-offset-3">
      <h1>Create your profile</h1>
      <br />
      <form className="form-horizontal" id="profileform">
        <fieldset>
          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="name">Name</label>
            <div className="col-md-8">
              <input id="name" name="name" type="text" placeholder="Hans" className="form-control input-md" defaultValue={this.props.player.name} required="" />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-3 control-label" htmlFor="avatar">Avatar</label>
            <div className="col-md-8">
              {avatars.map((avatar, idx) => <label key={avatar} className="radio-inline" style={{ marginLeft: 10 }}>
                <input type="radio" name="avatar" defaultChecked={idx == 0 || this.props.player.avatar == avatar} value={avatar} />
                <img src={avatar} width="50px" />
              </label>)}
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <button className="btn btn-primary" type="button" onClick={::this._joinGamePressed}>Join Game</button>
            <span>&nbsp;</span>
            <button className="btn btn-primary" type="button" onClick={::this._createGamePressed}>Create Game</button>
            </div>
          </div>
        </fieldset>
      </form >
    </div >
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.player
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayerData: (data) => {
      dispatch(updatePlayerData(data))
    }
  }
}

// tell react that we use the socket from context
Profile.contextTypes = {
  socket: React.PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
