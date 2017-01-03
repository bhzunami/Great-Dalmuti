import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

// http://www.codeply.com/go/bp/6mdOs5FvKU
export default class Chat extends React.Component {

    render() {
        return <div className="col-md-5">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Chat
        </div>
            </div>
            <div className="panel-body">
                <ul className="chat">
                    <li class="left clearfix">
                        <span className="chat-img pull-left">
                            <img src="http://placehold.it/50/55C1E7/fff&amp;text=U" alt="User Avatar" className="img-circle">
                        </span>
                            <div className="chat-body clearfix">
                                <div className="header">
                                    <strong className="primary-font">Jack Sparrow</strong> <small className="pull-right text-muted">
                                        <span className="glyphicon glyphicon-time"></span>12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div>
                        </li>
                        </ul>
                        </div>
            </div>
            }
}

