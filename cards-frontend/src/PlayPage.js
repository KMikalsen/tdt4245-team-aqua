import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import './PlayPage.css';
import {scenarios, cards} from './data/cards.js';
import GameCard from './GameCard.js';

const MAXLEN = 3;

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.send = this.send.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.state = {
            message: "",
            messages: [],
            scenario:{},
            playerDeck:[],
            serverDeck:[],
        }
    }

    componentDidMount() {
        this.setState({
            scenario:scenarios.s1
        })
        this.setState({
            playerDeck:cards
        })

        let that = this;
        this.props.socket.on('Chatmessage', function(msg) {
            console.log("got message")
            that.setState({
                messages: that.state.messages.concat([msg])
            })

        })
        this.props.socket.on('card_from_server', function(msg) {
            let card = cards.filter(item => {return item.id === msg.card})
            that.setState({
                serverDeck: that.state.serverDeck.concat(card)
            })
        })

        this.props.socket.on('remove_card', function(msg) {
            that.setState({
                serverDeck: that.state.serverDeck.filter( item => {return item.id !== msg.card })
            })
        })


    }
    componentDidUpdate(){
        let container = document.getElementById('container')
        container.scrollTop = container.scrollHeight - container.clientHeight;
    }

    send(msg) {
        this.props.socket.emit('Chatmessage', {'name':this.props.name, 'room':this.props.room,'id':this.props.socket.id, 'content': msg})
        this.setState({
            messages: this.state.messages.concat([{'name':this.props.name, 'room':this.props.room, id: this.props.socket.id, 'content': msg}])
        })
    }

    cardClick(event) {
        if (this.state.serverDeck.length >= MAXLEN)
            return
        this.props.socket.emit('card_to_server', {card: event.currentTarget.id, room:this.props.room})

        let card = cards.filter(item => {return item.id === event.currentTarget.id})
        this.setState({
            playerDeck: this.state.playerDeck.filter(item => { return item.id !== event.currentTarget.id }),
            serverDeck: this.state.serverDeck.concat(card)
        })
    }

    removeCard(id) {
        console.log(id);
        this.setState({
            serverDeck: this.state.serverDeck.filter(item => { return item.id !== id }),
            playerDeck: this.state.playerDeck.concat(cards.filter(item => {return item.id === id})),
        })
        this.props.socket.emit('request_remove', {card: id, room:this.props.room})
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
        const playerDeck = this.state.playerDeck.map(item => {
            return(
                <GameCard id={item.id} title={item.title} description={item.description} onclick={this.cardClick}/>
            )
        })
        const serverDeck = this.state.serverDeck.map(item => {
            return(
                <GameCard id={item.id} title={item.title} description={item.description} onclick = {null} removeable={true} removeCard = {this.removeCard} />
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
                    <div className = "serverDeck">
                        {serverDeck}
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
