import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import './PlayPage.css';
import {scenarios, cards} from './data/cards.js';
import GameCard from './GameCard.js';
import Scenario from './Scenario.js';
import { Button, Menu, List, Image, Input, Comment, Tab, Label } from 'semantic-ui-react';
import StartGame from './StartGame.js';

const MAXLEN = 2;

class PlayPage extends Component {
    constructor(props){
        super(props)
        this.send = this.send.bind(this);
        this.cardClick = this.cardClick.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
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
            feedback:[],
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

        this.props.socket.on('round_end', function(msg) {
            console.log("round end", msg)
            that.setState({
                playerDeck:[],
                serverDeck:[],
                gameStarted: false,
                feedback: that.state.feedback.concat(msg)
            }, () => {
                console.log(that.state)
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
    endGame() {

        this.props.socket.emit('end_game', {room:this.props.room, serverDeck: this.state.serverDeck})
    }

    render(){
        const messages = this.state.messages.map(item => {
            return(
                <Comment>
                    <Comment.Avatar src ={'https://ui-avatars.com/api/?name=' + item.name[0]} />
                    <Comment.Content>
                        <Comment.Author as='a'>{item.name}</Comment.Author>
                    <Comment.Metadata>
                      <div>{this.props.users.filter(user => {return item.id === user.id && user.host }).length > 0 ? "Host" : null}</div>
                    </Comment.Metadata>
                    <Comment.Text>{item.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            )
        })
        const playerDeck = this.state.playerDeck.map(item => {
            return(
                <GameCard id={item.id} title={item.title} description={item.description} onclick={this.cardClick}/>
            )
        })
        const scenario = (
            <Scenario scenario = {this.state.scenario} users={this.props.users} gameStarted = {this.state.gameStarted}
                        host = {this.props.host} startGame = {this.startGame} serverDeck = {this.state.serverDeck}
                        vote = {this.state.vote} voteFunc = {this.vote} endGame={this.endGame} voteCount = {this.state.voteCount}
                        removeCard = {this.removeCard} id={this.props.id} />
        )
        const results = (
            <div >
            </div>
        )
        const panes = [
            {menuItem:'Game', render: () => <Tab.Pane style={{height:'95%', padding:'0'}}> {scenario} </Tab.Pane>},
            {menuItem: (<Menu.Item key="results"> Results <Label>0</Label></Menu.Item>), render: () => <Tab.Pane style={{height:'95%', padding:'0'}}> {results} </Tab.Pane>}
        ]
        if (!this.props.joined){
            return (
                <Redirect to="/" />
            )
        }
        return(
            <div className = "playArea">
                <Menu className = "header">
                    <Menu.Item header> Privacy. </Menu.Item>
                    <Menu.Item name={this.props.room} />
                </Menu>

                <Tab className="scenario" panes={panes}/>

                <div className = "deck">
                    {playerDeck}
                </div>
                <div className = "chat">
                    <div className = "sendContainer">
                        <Input fluid placeholder="Enter message..."
                        onKeyDown ={(event) => {
                            if (event.keyCode == 13){
                                document.getElementById('chat').click()
                            }
                        }}
                        value={this.state.message} onChange={(event) => {
                            this.setState({
                                message:event.target.value
                            })
                        }}
                        action= {
                            <Button id="chat" onClick={() => {
                                this.send(this.state.message)
                                this.setState({
                                    message:""
                                })
                            }}>
                            Chat
                            </Button>
                        } />

                        </div>
                    <Comment.Group className = "messageContainer" id="container">
                        {messages}
                    </Comment.Group>
                </div>
            </div>
        )
    }
}

export default PlayPage;
