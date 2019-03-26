import React, {
    Component
} from 'react';

import { Button, Card, List, Image, Icon, Label } from 'semantic-ui-react';
import GameCard from './GameCard.js';
import StartGame from './StartGame.js';

const MAXLEN = 2;
class Scenario extends Component {
    componentDidUpdate() {
        this.props.resetCounter();
    }
    componentDidMount() {
        this.props.resetCounter();
    }
    render(){
        const users = this.props.users.map(item => {
            return(<List.Item>
                    <Image avatar style={{borderRadius:'.25rem'}} square src={'https://ui-avatars.com/api/?background='+item.color+'&color=fff&name='+item.name}/>
                    <List.Content verticalAlign="middle">
                        <List.Header>
                            {item.name}
                        </List.Header>
                        {item.host ? 'Host' : null}
                    </List.Content>
                </List.Item>)
            })

            const serverDeck = this.props.serverDeck.map(item => {
                console.log(this.props.users, this.props.users.filter(user=>{return user.id === item.owner}))
                return(
                    <GameCard owner={this.props.users.filter(user=>{return user.id === item.owner})[0]} id={item.id} title={item.title} description={item.description} onclick = {null} removeable={item.removeable} removeCard = {this.props.removeCard} serverDeck={true}/>
                )
            })

        return(
            <div className="scenarioContent">
                <div className ="scenarioContainer">
                    <h1>{this.props.scenario.title}</h1>
                    {this.props.scenario.description}
                </div>
                <List className ="userContainer">
                    {users}
                </List>
                <StartGame gameStarted={this.props.gameStarted} host={this.props.host} startGame={this.props.startGame}/>
                <div className = "playInfo" style={{visibility:this.props.gameStarted ? 'visible': 'hidden'}}>
                    {this.props.serverDeck.length} of {MAXLEN} cards in play.
                 </div>
                <div className = "serverDeck">
                    {serverDeck}
                </div>
                <div  className = "voteResultContainer" style={{visibility:this.props.gameStarted ? 'visible': 'hidden'}}>
                    <Button as='div' labelPosition='right' style={{visibility:this.props.gameStarted ? 'visible': 'hidden'}} onClick = {() => {
                        this.props.voteFunc();
                    }}>
                    <Button icon basic  color={this.props.vote ? 'green': 'red' }>
                        <Icon size="large" name="thumbs up outline" />
                    </Button>
                    <Label pointing='left' basic color={this.props.voteCount === this.props.users.length ? 'green': 'red' }>
                        {this.props.voteCount} / {this.props.users.length}
                    </Label>
                    </Button>
                    <Button color="green" style={{visibility:(this.props.host && this.props.gameStarted && (this.props.voteCount === this.props.users.length) && (this.props.serverDeck.length > 0)) ? 'visible': 'hidden'}} variant='contained' onClick = {() => {this.props.endGame()}}>
                    Play hand
                    </Button>
                </div>
            </div>
        )
    }
}

export default Scenario;
