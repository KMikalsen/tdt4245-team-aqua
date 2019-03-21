import React, {
    Component
} from 'react';

import Button from '@material-ui/core/Button';

class StartGame extends Component {

    render() {
        if ( this.props.host && !this.props.gameStarted ){
            return(<div  style={{gridColumn:2, gridRow:2, alignSelf:'center', justifySelf:'center',
                                display:'flex', flexDirection:'column', alignItems:'center'}} >
                <p> You're the host. Start the game once all players have entered the room. </p>
                <Button style={{ maxWidth:'200px', maxHeight:'200px'}} variant='contained' onClick = {() => {this.props.startGame()}}>
                    Start game
                </Button>
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
