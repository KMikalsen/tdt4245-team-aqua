import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import Particles from 'react-particles-js'
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
                    <h1>Privacy<span onClick={()=>{
                        document.getElementById('fpImage').style.setProperty('background-image', 'url("https://media0.giphy.com/media/CaiVJuZGvR8HK/giphy.gif")')
                    }}>.</span></h1>
                </div>
                <div className = "nameContainer">
                    <Input
                        id="standard-name"
                        label="Name"
                        maxLength="10"
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
                        maxLength="4"
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
                <div id="fpImage" className = "fpImage">

                </div>
                <div className = "fpParticles">
                <Particles height="100%"
                    params={{
                        "particles": {
                            "number": {
                                "value": 100
                            },
                            "color":{
                                "value":"#4DC0B5"
                            },
                            "size": {
                                "value": 3
                            },
                            "line_linked": {
                              "enable": true,
                              "distance": 150,
                              "color": "#4DC0B5",
                              "opacity": 0.6,
                              "width": 1
                            },
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": false,
                                    "mode": "bubble"
                                }
                            },
                            "modes": {
                              "bubble": {
                                "distance": 200,
                                "size": 6,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                              },
                          }

                        }
                    }} />
                </div>
            </div>
        )

    }
}
export default FrontPage;
