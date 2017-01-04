import Navigation from './Navigation'

export default class Profile extends React.Component {
  // subcomponents can use variables from the context, so we don't need to pass them explicitly everytime
  getChildContext() {
    return {
      socket: this.props.route.socket // passed down from App.js
    };
  }

  render() {
    // show navigation, and the current page (given from App.js/Router)
    return <div>
      <Navigation />
      <div className="container">
        {this.props.children}
      </div>
    </div>
  }
}

// data type of the context variables
Profile.childContextTypes = {
  socket: React.PropTypes.object
};
