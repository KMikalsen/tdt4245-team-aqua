import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class FrontPage extends Component {
    render(){
        if ( this.props.joined ) {
            return (
                <Redirect to="/play" />
            )
        }
        return(
            <div className = "App" >
                <div className = "title">
                    <h1>Privacy.</h1>
                </div>
                <div className = "nameContainer">
                    <TextField
                        id="standard-name"
                        label="Name"
                        value={this.props.name}
                        onChange={(event) => {
                            this.props.nameChange(event)
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                </div>
                <div className = "buttonContainer" id = "joinRoom">
                    <Button
                        variant="outlined"
                        style={{visibility:this.props.name ? 'visible':'hidden', height:'fit-content'}}
                        onClick={this.props.join_room}
                    >
                        Join Room
                    </Button>
                    <TextField
                        id="standard-code"
                        label="Room code"
                        value={this.props.room}
                        onChange={(event) => {
                            this.props.roomChange(event)
                        }}
                        style={{visibility: this.props.name ? 'visible':'hidden', marginLeft:'15px'}}
                        maxLength="4"
                        margin="normal"
                    />
                </div>
                <div className = "buttonContainer" id = "createRoom">
                    <Button
                        variant="outlined"
                        style={{visibility:this.props.name ? 'visible':'hidden' }}
                        onClick={this.props.create_room}
                    >
                        Create Room
                    </Button>
                </div>
                <div className = "image">

                </div>
            </div>
        )

    }
}
export default FrontPage;
