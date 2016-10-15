import { browserHistory } from 'react-router'

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

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this._joinGame = this._joinGame.bind(this);
    this._createGame = this._createGame.bind(this);
  }
  _validate() {
    if ($("#name").val() == "") {
      alert("Please provide a name!");
      return false;
    }

    return true;
  }

  _joinGame() {
    if (!this._validate()) return;

    browserHistory.push('/game/join');
  }

  _createGame() {
    if (!this._validate()) return;

  }
  render() {
    return <div className="col-md-6 col-md-offset-3">
      <h1>Create your profile</h1>
      <br />
      <form className="form-horizontal">
        <fieldset>
          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="name">Name</label>
            <div className="col-md-8">
              <input id="name" name="name" type="text" placeholder="Hans" className="form-control input-md" required="" />

            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label" htmlFor="avatar">Avatar</label>
            <div className="col-md-8">
              {avatars.map((avatar, idx) => <label key={avatar} className="radio-inline" style={{ marginLeft: 10 }}>
                <input type="radio" name="avatar" defaultChecked={idx == 0} value={avatar} />
                <img src={avatar} width="50px" />
              </label>)}
            </div>
          </div>
          <br />
          <div className="form-group">
            <div className="col-md-12" style={{ textAlign: "center" }}>
              <button className="btn btn-primary" type="button" onClick={this._joinGame}>Join Game</button>
              <span>&nbsp;</span>
              <button className="btn btn-primary" type="button" onClick={this._createGame}>Create Game</button>
            </div>
          </div>
        </fieldset>
      </form>

    </div>
  }
}