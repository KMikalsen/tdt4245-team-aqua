import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import './PlayPage.css';

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.send = this.send.bind(this);
        this.state = {
            message: "",
            messages: []
        }
    }

    componentDidMount() {
        let that = this;
        this.props.socket.on('message', function(msg) {
            that.setState({
                messages: that.state.messages.concat([msg])
            })

        })
    }
    componentDidUpdate(){
        let container = document.getElementById('container')
        container.scrollTop = container.scrollHeight - container.clientHeight;
    }

    send(msg) {
        this.props.socket.emit('message', {'name':this.props.name, 'room':this.props.room,'id':this.props.socket.id, 'content': msg})
        this.setState({
            messages: this.state.messages.concat([{'name':this.props.name, 'room':this.props.room, id: this.props.socket.id, 'content': msg}])
        })
    }

    render(){
        const messages = this.state.messages.map(item => {
            let cName = "message "
            cName += item.id === this.props.socket.id ? "selfMessage" : ""
            return(<div className = {cName}> <span className="messageName">{item.name}</span>: {item.content}</div>)
        })
        if (!this.props.joined){
            return (
                <Redirect to="/" />
            )
        }
        return(
            <div className = "playArea">
                <div className = "header">
                {this.props.room}
                </div>
                <div className = "scenario">
                </div>
                <div className = "deck">
                </div>
                <div className = "chat">
                    <div className = "sendContainer">
                        <input  className = "chatInput" type="text" placeholder="Enter message..."
                        onKeyDown ={(event) => {
                            if (event.keyCode == 13){
                                document.getElementById('chat').click()    
                            }
                        }}
                        value={this.state.message} onChange={(event) => {
                            this.setState({
                                message:event.target.value
                            })
                        }} />
                        <button className = "chatSend" id="chat" style={{visibility:this.props.name ? 'visible':'hidden' }} onClick={() => {
                            this.send(this.state.message)
                            this.setState({
                                message:""
                            })
                        }}>
                        Chat
                        </button>
                        </div>
                    <div className = "messageContainer" id="container">
                        {messages}
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayPage;
