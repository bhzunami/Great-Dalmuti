import { Router, Route, Link, browserHistory } from 'react-router'



export default class Index extends React.Component {
  componentDidMount() {
    console.log(this.context.socket);
    // socket.on('test', this._test);
    // socket.on('new_player', game =>{
    //   console.log("New player: ", game);
    // });
    // socket.emit("test", "bal")

  }

  _initialize() {
    socket.emit()

  }

  _test(data) {
    console.log("Data: ", data)
  }


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