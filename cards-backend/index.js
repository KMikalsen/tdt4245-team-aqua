var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const colors = ['74A85F', '3E7F61', '3A4A40', 'DFBD52', 'B95038', '0E1D23', '4D8175', 'DD4B62', '4B464E', '383839']

let rooms = []

app.get('/', function(req, res) {
    res.send('<h1>Hello world </h1>')
});

class Vote {
    Vote(id){
        this.id = id
        this.vote = false
    }
}

io.on('connection', function(socket) {
    console.log(socket.id,'connected')
    socket.on('disconnect', function(){
        console.log(socket.id, ' disconnected')
    })
    socket.on('Chatmessage', function(msg) {
        console.log(msg)
        socket.in(msg.room).emit('Chatmessage', {
            'name': msg.name,
            'room': msg.room,
            'content': msg.content,
            'id':msg.id,
        })
    });

    socket.on('create_room', function(msg, callback) {
        let result = ""
        for (var i = 0; i < 4; i++) {
            result += charset[Math.floor(Math.random() * charset.length)];
        }
        console.log('Create room: ',socket.id,':', result)
        rooms[result] = {
            users:[],
            votes:[]
        }
        callback(result)
    })

    socket.on('join_room', function(msg) {
        socket.join(msg.room)
        if (!(msg.room in rooms)){
            rooms[msg.room] = {
                users:[],
                votes:{}
            }
        }
        msg['color'] = colors[Math.floor(Math.random() * colors.length)];
        rooms[msg.room].users = rooms[msg.room].users.concat([msg])
        rooms[msg.room].votes[msg.id] = false;
        console.log(rooms[msg.room].votes)
        console.log(msg.name, " joined ", msg.room)
        io.in(msg.room).emit('user_joined', rooms[msg.room] )
    })

    socket.on('card_to_server', function(msg) {
        socket.in(msg.room).emit('card_from_server', {card:msg.card, user: socket.id})
    })

    socket.on('request_remove', function(msg) {
        socket.in(msg.room).emit('remove_card', {card:msg.card, user: socket.id})
    })

    socket.on('vote', function(msg) {
        rooms[msg.room].votes[msg.id] = msg.vote;
        let result = Object.values(rooms[msg.room].votes).reduce((total, num) => {return total + (num ? 1 : 0)})
        result = result + 0;
        io.in(msg.room).emit('vote_update', {result: result })
    })
    socket.on('game_start', function(msg) {
        let scenarioCards = msg.deck;
        let users = rooms[msg.room].users;
        let counter = 0;
        let decks = users.map(item => {
            return({
                uid:item.id,
                deck:[]
            })
        })
        while(scenarioCards.length > 0 ){
            decks[counter % users.length].deck.push(scenarioCards.pop());
            counter +=1;
        }
        console.log(decks);
        io.in(msg.room).emit('start_game', {scenario:msg.scenario, decks:decks})
    })
    socket.on('end_game', function(msg) {
        console.log("End game", msg)
        let feedback = msg.serverDeck.map(item => {return {title:item.title, feedback:item.feedback, color:item.color}})
        io.in(msg.room).emit('round_end', {feedback: feedback, scenario:msg.scenario})
    })
});

http.listen(8000, function() {
    console.log('listening on *:8000')
});
