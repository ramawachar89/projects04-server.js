const cors=require('cors')
const express=require('express')

const app=express();

const http= require('http');
const {Server} = require('socket.io')
const server = http.createServer(app);
const io = new Server(server)
const userSocketMap={}
app.use(cors())
function getAllConnectedClients(){
    Array.from(io.sockets.adapter.rooms.get(roomId)|| []).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId],
        }
    })
}

io.on('connection',(socket)=>{
    console.log('socket connected',socket.id)
    socket.on(ACTIONS.JOIN,({roomId,username}))
    userSocketMap[socket.id]=username;
    socket.join(roomId);
    const clients=getAllConnectedClients(roomId)
    console.log(clients)
    clients.forEach(({socketId})=>{
    io.to(socketid).emit(ACTIONS.JOINED,{
        clients,
        username,
        socketId:socket.id
    })
    })
})  
const PORT =  5000;

server.listen(PORT,()=>console.log(`Listening on port ${PORT}`))