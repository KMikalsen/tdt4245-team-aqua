import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import './PlayPage.css';
import {scenarios, cards} from './data/cards.js';
import GameCard from './GameCard.js';
import Button from '@material-ui/core/Button';
import StartGame from './StartGame.js';

const MAXLEN = 2;

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.send = this.send.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.startGame = this.startGame.bind(this);
        this.vote = this.vote.bind(this);
        this.state = {
            message: "",
            gameStarted:false,
            messages: [],
            scenario:{},
            playerDeck:[],
            serverDeck:[],
            voteCount:0,
            vote:false,
        }
    }

    componentDidMount() {
        // this.setState({
        //     scenario:scenarios.s1
        // })
        // this.setState({
        //     playerDeck:cards
        // })

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

        this.props.socket.on('vote_update', function(msg) {
            that.setState({
                voteCount: msg.result
            })
        })

        this.props.socket.on('start_game', function(msg) {
            let deck = msg.decks.find(obj => {
                return obj.uid === that.props.socket.id
            }).deck

            that.setState({
                playerDeck: cards.filter(item =>{
                    return deck.includes(item.id)
                }),
                scenario:scenarios["s"+msg.scenario],
                gameStarted : true,
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

    vote() {
        this.setState(prevState => ({
            vote: !prevState.vote,
        }), () => {
            this.props.socket.emit('vote', {
                id:this.props.socket.id,
                room:this.props.room,
                vote:this.state.vote,
            })
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

    startGame() {
        this.props.socket.emit('game_start', {room:this.props.room, scenario:1})
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
                    <StartGame gameStarted={this.state.gameStarted} host={this.props.host} startGame={this.startGame}/>
                    <div className = "playInfo" style={{visibility:this.state.gameStarted ? 'visible': 'hidden'}}>
                        {this.state.serverDeck.length} of {MAXLEN} cards in play.
                     </div>
                    <div className = "serverDeck">
                        {serverDeck}
                    </div>
                    <div  className = "voteResultContainer" style={{visibility:this.state.gameStarted ? 'visible': 'hidden'}}>
                        <Button style={{backgroundColor: this.state.vote ? '#51D88A': '#d5d5d5', visibility:this.state.gameStarted ? 'visible': 'hidden'}}variant = "contained" onClick = {() => {
                            this.vote();
                        }}>
                        👍
                        </Button>
                        <p> {this.state.voteCount} of {this.props.users.length} players agree </p>
                        <Button style={{visibility:(this.props.host && this.state.gameStarted && (this.state.voteCount === this.props.users.length) && (this.state.serverDeck.length > 0)) ? 'visible': 'hidden'}} variant='contained' onClick = {() => {}}>
                            End turn
                        </Button>
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
