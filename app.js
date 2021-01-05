//const path =require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');


//static files
app.use(express.static('public'));
//start server
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
});
 



//websocket
const io = socketIO(server);
io.on('connection',(socket)=>{
    console.log('new conection'+socket.id);
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data);
    });
})



