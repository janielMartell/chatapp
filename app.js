var app = require('express')();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var http = require('http').Server(app);
http.listen(3300, function () {
    console.log('listening on localhost:33000');
});

var io = require('socket.io')(http);
io.on('connection', function (socket) {
    socket.broadcast.emit("alert", "user joined")

    socket.on('send', function (msg) {
        console.log("received");
        socket.broadcast.emit('receive', msg);
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit("alert", "user left")
    });
});