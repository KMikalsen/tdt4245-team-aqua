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
    socket.on('message', function(msg) {
        console.log(msg)
        socket.in(msg.room).emit('message', {
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
});

http.listen(8000, function() {
    console.log('listening on *:8000')
});
