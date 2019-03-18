import React, {
    Component
} from 'react';
import {Redirect} from 'react-router-dom';

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
                    <input type="text" placeholder="Name" value={this.props.name} onChange={(event) => {
                        this.props.nameChange(event)
                    }} />
                </div>
                <div className = "buttonContainer" id = "joinRoom">
                    <button className ="fpButton" style={{visibility:this.props.name ? 'visible':'hidden' }} onClick={this.props.join_room}>
                    Join room
                    </button>
                <input  placeholder ="Room code" style={{fontSize:'2em',
                visibility: this.props.name ? 'visible':'hidden' }} type="text" value={this.props.room} maxLength="4" onChange={(event) => {
                    this.props.roomChange(event)
                }} />
                </div>
                <div className = "buttonContainer" id = "createRoom">
                    <button className ="fpButton" style={{visibility:this.props.name ? 'visible':'hidden' }} onClick={this.props.create_room}>
                    Create room
                    </button><br/>
                </div>
                <div className = "image">

                </div>
            </div>
        )

    }
}
export default FrontPage;
