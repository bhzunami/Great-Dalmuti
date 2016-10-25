import Navigation from './Navigation'

export default class Profile extends React.Component {
  getChildContext() {
    return {
      socket: this.props.route.socket // passed down from App.js
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
