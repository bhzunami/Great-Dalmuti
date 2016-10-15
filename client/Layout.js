import Navigation from './Navigation';

export default class Profile extends React.Component {
  render() {
    return <div>
      <Navigation />
      <div className="container">

        {this.props.children}
      </div>
    </div>
  }
}