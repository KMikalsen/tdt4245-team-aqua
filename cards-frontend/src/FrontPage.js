import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Input, Divider } from 'semantic-ui-react';

class FrontPage extends Component {
    render(){
        if ( this.props.joined ) {
            return (
                <Redirect to="/play" />
            )
        }
        const joinButton = (
            <Button style={{visibility:this.props.name ? 'visible':'hidden'}}
                    color="teal" invert
                    onClick={this.props.join_room}>
                Join Room
            </Button>
        )
        return(
            <div className = "App" >
                <div className = "title">
                    <h1>Privacy.</h1>
                </div>
                <div className = "nameContainer">
                    <Input
                        id="standard-name"
                        label="Name"
                        value={this.props.name}
                        onChange={(event) => {
                            this.props.nameChange(event)
                        }}
                    />
                </div>
                <div className = "buttonContainer" id = "joinRoom"
                style={{visibility:this.props.name ? 'visible':'hidden' }}>

                    <Input
                        id="standard-code"
                        placeholder="Room code"
                        action={joinButton}
                        actionPosition='left'
                        value={this.props.room}
                        onChange={(event) => {
                            this.props.roomChange(event)
                        }}
                    />
                </div>
                <div className = "buttonContainer" id = "createRoom" style={{visibility:this.props.name ? 'visible':'hidden' }}>
                <Divider />
                    <Button onClick={this.props.create_room} color="teal" invert>
                        Create Room
                    </Button>
                <Divider horizontal>Or</Divider>
                </div>
                <div className = "fpImage">

                </div>
            </div>
        )

    }
}
export default FrontPage;
