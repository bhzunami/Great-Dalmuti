import { Router, Route, Link, browserHistory } from 'react-router'



export default class Index extends React.Component {
  render() {
    return <div>
      <div className="starter-template">
        <div><img src="static/logo.png" /></div>
        <p className="lead">Funny card game for up to 8 players.</p>
        <Link to="/profile" className="btn btn-primary">Go to lobby</Link>
      </div>
    </div>
  }
}
Index.contextTypes = {
  socket: React.PropTypes.object
};