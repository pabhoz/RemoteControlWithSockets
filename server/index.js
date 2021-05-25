const express = require('express');
const app = express();
const http = require('http');
var cors = require('cors');
const server = http.createServer(app);
// Socket IO
const path = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

app.use(cors());

app.use('/node_modules', express.static(path.join(__dirname, './', 'node_modules')));
app.use('/game', express.static(__dirname + '/game'));
app.use('/controller', express.static(__dirname + '/controller'));


app.get('/controller', (req, res) => {
    res.sendFile(__dirname + '/controller/index.html');
});
// Servidor HTTP
server.listen(3000, () => {
    console.log('Servidor web (HTTP) andando y escuchando por http://localhost:3000');
})

// Servidor de Sockets
io.on('connection', (socket) => {
    console.log("A user is conected");
    socket.on('touch', (who) => {
        io.emit('touch', who);
    });
    socket.on('untouch', (who) => {
        io.emit('untouch', who);
    });
    socket.on('disconnect', () => {});
});
