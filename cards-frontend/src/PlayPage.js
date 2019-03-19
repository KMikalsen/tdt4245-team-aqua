import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import './PlayPage.css';
import {scenarios, cards} from './data/cards.js';


class PlayPage extends Component {
    constructor(props){
        super(props)
        this.send = this.send.bind(this);
        this.state = {
            message: "",
            messages: [],
            scenario:{},
            cards:[]
        }
    }

    componentDidMount() {
        let that = this;
        this.props.socket.on('message', function(msg) {
            that.setState({
                messages: that.state.messages.concat([msg])
            })

        })
        this.setState({
            scenario:scenarios.s1
        })
        this.setState({
            cards:cards
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
        const users = this.props.users.map(item => {
            return(<div>
                {item.host ? '⭐' : null}{item.name} {item.id === this.props.socket.id ? '(you)' : null}
            </div>)
        })
        const playerDeck = this.state.cards.map(item => {
            return(
                <div className ="card">
                {item.title} <br/>
                {item.description}
                </div>
            )
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
                    <div className ="scenarioContainer">
                        <h1>{this.state.scenario.title}</h1>
                        {this.state.scenario.description}
                    </div>
                    <div className ="userContainer">
                        <span style={{fontWeight:'bold'}}>Users:</span>
                        {users}
                    </div>
                </div>
                <div className = "deck">
                    {playerDeck}
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
