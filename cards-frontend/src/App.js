import React, {
    Component
} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './App.css';
import FrontPage from './FrontPage.js';
import PlayPage from './PlayPage.js';
import io from 'socket.io-client'
var socket = io.connect('http://10.22.3.159:8000', {
    resource: 'nodejs'
})

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message:"",
            name: "",
            joined: false,
            host: false,
            room:"",
            users:[],
            messages:[]
        }
        this.create_room = this.create_room.bind(this);
        this.join_room = this.join_room.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.roomChange = this.roomChange.bind(this);
        this.FrontPageRoute = this.FrontPageRoute.bind(this);
        this.PlayPageRoute = this.PlayPageRoute.bind(this);
    }
    componentDidMount() {
        let that = this;
        socket.on('connect', function(){
            console.log('connected')
        })
        socket.on('user_joined', function(msg) {
            that.setState({
                users:msg.users
            })
            console.log(that.state.users)
        })
    }
    join_room() {
            socket.emit('join_room', {'name':this.state.name, 'room':this.state.room, 'id':socket.id, 'host':this.state.host});
            this.setState({
                redirect:true
            })
    }
    create_room() {
        let that = this;
        this.setState({
            host:true,
            users:[{
                name:this.state.name,
                room:this.state.room,
                id:socket.id,
                host:true,
            }]
        })
        socket.emit('create_room', this.state.name, function(response){
            that.setState({
                room:response,
                redirect:true
            })
            that.join_room()
        ;});
    }

    nameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    roomChange(event) {
        var pattern = new RegExp(/[^A-Z]/i);

        if ( !pattern.test(event.target.value)) {
            this.setState({
                room: event.target.value.toUpperCase()
            })
        }
    }

    FrontPageRoute() {
      return (
        <FrontPage name={this.state.name} room={this.state.room} create_room={this.create_room} join_room = {this.join_room} nameChange = {this.nameChange} roomChange = {this.roomChange} joined = {this.state.redirect}/>
      );
    }

    PlayPageRoute() {
      return (
        <PlayPage name={this.state.name} room={this.state.room} users = {this.state.users} socket = {socket} joined = {this.state.redirect} host = {this.state.host} />
      );
    }

    render() {
        return (
            <div>
                <Router>
                    <Route path="/play/" component= {this.PlayPageRoute} />
                    <Route path="/" exact component={this.FrontPageRoute} />
                </Router>
            </div>

        );
    }
}

export default App;
