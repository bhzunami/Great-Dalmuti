import { Router, Route, Link, browserHistory } from 'react-router'



export default class Index extends React.Component {
  render() {
    return <div>
      <div className="starter-template">
        <h1>The Great Dalmuti</h1>
        <p className="lead">You need to play this awesome game!</p>
        <Link to="/profile" className="btn btn-primary">Start game!</Link>
      </div>
    </div>
  }
}
Index.contextTypes = {
  socket: React.PropTypes.object
};