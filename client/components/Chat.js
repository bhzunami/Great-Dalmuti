import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

import './Chat.scss'

// displays the chat box on the bottom right in a game.

// original html & css source code from here: http://packetcode.com/apps/facebook-like-chat/

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        // init state
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        // listen on new chat messages in the game
        this.context.socket.on(this.props.game_id + "_chat", this.chatMessageRecieved.bind(this));
    }

    chatMessageRecieved(msg) {
        // update state
        this.setState({ messages: [...this.state.messages, msg] });
    }

    closeChat() {
        // open or close chat
        $('.msg_wrap').slideToggle('slow');
    }

    sendMessage(event) {
        if (event.key !== 'Enter') return;
        if (event.target.value.length === 1) return;
        // send a message when pressing enter

        this.context.socket.emit("chat", event.target.value);

        event.target.value = "";
    }

    componentDidUpdate() {
        // automatically scroll to bottom when a new chat message is coming
        const objDiv = $("#chat .msg_body")[0];
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const player_id = this.props.player_id;

        // process messages, look if they are from the current player or from someone else
        const messages = this.state.messages.map(({ id, name, msg }, idx) => <div className={player_id == id ? "msg_own" : "msg_other"} key={idx}><b>{name}</b> <br />{msg}</div >);

        // display the chat box
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

// we use web sockets here
Chat.contextTypes = {
    socket: React.PropTypes.object
};
