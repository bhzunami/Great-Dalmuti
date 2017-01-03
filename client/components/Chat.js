import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import './Chat.scss'

// http://www.codeply.com/go/bp/6mdOs5FvKU
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.context.socket.on(this.props.game_id + "_chat", this.chatMessageRecieved.bind(this));
    }

    chatMessageRecieved(msg) {
        this.setState({ messages: [...this.state.messages, msg] });
    }

    closeChat() {
        $('.msg_wrap').slideToggle('slow');
    }

    sendMessage(event) {
        if (event.key !== 'Enter') return;
        if (event.target.value.length === 0) return;

        this.context.socket.emit("chat", event.target.value);

        event.target.value = "";
    }

    componentDidUpdate() {
        const objDiv = $("#chat .msg_body")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const player_id = this.props.player_id;

        const messages = this.state.messages.map(({ id, name, msg }, idx) => <div className={player_id == id ? "msg_own" : "msg_other"} key={idx}><b>{name}</b> <br />{msg}</div >);

        return <div id="chat">

            <div className="msg_box">
                <div className="msg_head" onClick={::this.closeChat}>Game Chat
                <div className="close">&mdash;</div>
            </div>
            <div className="msg_wrap">
                <div className="msg_body">
                    {messages}
                    <div className="msg_push"></div>
                </div>
                <div className="msg_footer"><textarea className="msg_input" rows="4" onKeyUp={::this.sendMessage}></textarea></div>
        </div>
        </div >

        </div >
    }
}


Chat.contextTypes = {
    socket: React.PropTypes.object
};


/*

            <div className="panel panel-primary">
                <div className="panel-heading">
                    Chat
        </div>
            </div>
            <div className="panel-body">
                <ul className="chat">
                    <li className="left clearfix">
                        <span className="chat-img pull-left">
                            <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
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
            </div>*/