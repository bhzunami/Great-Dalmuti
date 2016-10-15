import { Link, browserHistory } from 'react-router'

export default class Play extends React.Component {
  render() {
    console.log(this);
    return <div>
      <h1>Play game {this.props.params.id}</h1>
      </div>
  }
}