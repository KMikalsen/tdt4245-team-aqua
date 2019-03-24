import React, {
    Component
} from 'react';

import { Button, Card, List, Image } from 'semantic-ui-react';
import GameCard from './GameCard.js';
import StartGame from './StartGame.js';

const MAXLEN = 2;
class Scenario extends Component {
    render(){
        const users = this.props.users.map(item => {
            return(<List.Item>
                    <Image avatar src={'https://ui-avatars.com/api/?name=' + item.name[0]}/>
                    <List.Content verticalAlign="middle">
                        <List.Header>
                            {item.name}
                        </List.Header>
                        {item.host ? 'Host' : null}
                    </List.Content>
                </List.Item>)
            })

            const serverDeck = this.props.serverDeck.map(item => {
                return(
                    <GameCard id={item.id} title={item.title} description={item.description} onclick = {null} removeable={true} removeCard = {this.props.removeCard} />
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
                    <Button style={{backgroundColor: this.props.vote ? '#51D88A': '#d5d5d5', visibility:this.props.gameStarted ? 'visible': 'hidden'}}variant = "contained" onClick = {() => {
                        this.props.voteFunc();
                    }}>
                    👍
                    </Button>
                    <p> {this.props.voteCount} of {this.props.users.length} players agree </p>
                    <Button style={{visibility:(this.props.host && this.props.gameStarted && (this.props.voteCount === this.props.users.length) && (this.props.serverDeck.length > 0)) ? 'visible': 'hidden'}} variant='contained' onClick = {() => {this.props.endGame()}}>
                    End turn
                    </Button>
                </div>
            </div>
        )
    }
}

export default Scenario;
