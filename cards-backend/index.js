var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let rooms = []

app.get('/', function(req, res) {
    res.send('<h1>Hello world </h1>')
});

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
            'content': msg.content
        })
    });

    socket.on('create_room', function(msg, callback) {
        let result = ""
        for (var i = 0; i < 4; i++) {
            result += charset[Math.floor(Math.random() * charset.length)];
        }
        console.log('Create room: ',socket.id,':', result)
        rooms[result] = {
            users:[]
        }
        callback(result)
    })

    socket.on('join_room', function(msg) {
        socket.join(msg.room)
        if (!(msg.room in rooms)){
            rooms[msg.room] = {
                users:[]
            }
        }
        rooms[msg.room].users = rooms[msg.room].users.concat([msg])
        console.log(msg.name, " joined ", msg.room)
        io.in(msg.room).emit('user_joined', rooms[msg.room] )
    })

    socket.on('card_to_server', function(msg) {
        // console.log(msg)
        socket.in(msg.room).emit('card_from_server', {card:msg.card, user: socket.id})
    })

    socket.on('request_remove', function(msg) {
        socket.in(msg.room).emit('remove_card', {card:msg.card, user: socket.id})
    })

    socket.on('game_start', function(msg) {
        let scenarioCards = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
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
});

http.listen(8000, function() {
    console.log('listening on *:8000')
});
