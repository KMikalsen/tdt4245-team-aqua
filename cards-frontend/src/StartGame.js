import React, {
    Component
} from 'react';

import { Button, Dropdown, Popup } from 'semantic-ui-react';
import {scenarios, cards} from './data/cards.js';

class StartGame extends Component {
    state = {
        selected:'S1'
    }
    handleChange = (e, { name, value }) => this.setState({ selected: value })

    render() {
        const options = Object.values(scenarios).map(item => {
            return {key:item.id, text:item.title, value:item.id}
        });

        if ( this.props.host && !this.props.gameStarted ){
            return(<div  style={{gridColumn:2, gridRow:2, alignSelf:'center', justifySelf:'center',
                                display:'flex', flexDirection:'column', alignItems:'center'}} >
                <p> You're the host. Start the game once all players have entered the room. </p>
                <Popup position="top right" trigger={
                <Button.Group color="teal">
                <Button style={{ maxWidth:'200px', maxHeight:'200px'}} onClick = {() => {this.props.startGame(this.state.selected)}}>
                    Start game
                </Button>
                <Dropdown id="scenarioSelect" as={Button} floating options={options} defaultValue='S1' onChange={this.handleChange} />
                </Button.Group>
            } content='Choose a game scenario' />
                </div>
            )
        }
        if (!this.props.host && !this.props.gameStarted){
            return (
                <div  style={{gridColumn:2, gridRow:2, alignSelf:'center', justifySelf:'center',
                                    display:'flex', flexDirection:'column', alignItems:'center'}} >
                    <p> Waiting for host to start the game. </p>
                    </div>
            )
        }
        return null;
    }

}

export default StartGame;
