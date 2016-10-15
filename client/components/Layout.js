import Navigation from './Navigation';

const socket = io.connect();

export default class Profile extends React.Component {
  getChildContext() {
    return {
      socket: socket
    };
  }
  render() {
    return <div>
      <Navigation />
      <div className="container">
        {this.props.children}
      </div>
    </div>
  }
}
Profile.childContextTypes = {
  socket: React.PropTypes.object
};