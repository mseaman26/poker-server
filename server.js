import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handleJoinRoom, handleLeaveRoom, handleRoomDeleted } from "./handlers/roomHandlers.js";
import { handleGameEvents } from "./handlers/gameHandlers.js";

app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://poker-taupe-one.vercel.app' : 'http://localhost:3000', // Update with your production app's URL
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

//map for keeping track of online uses
const activeUsers = new Map()
const userToSocketId = new Map()

io.on("connection", (socket) =>   {
  console.log(`User Connected: ${socket.id}`);

  socket.on('activate user', (data) => {
    if(!activeUsers.has(data.id)){
      activeUsers.set(socket.id, {id: data.id, email: data.email, username: data.username, socketId: socket.id})
      userToSocketId.set(data.id, socket.id)
    }
    io.emit('active users', Array.from(activeUsers.values()))
  })
  socket.on('request active users', () => {
    io.emit('active users', Array.from(activeUsers.values()))
  })
  socket.on('friend refresh', (data) => {
    let socketId = userToSocketId.get(data.friendId);
    socket.to(socketId).emit('friend refresh')
  })
  socket.on('friends refresh', (data) => {
    data.forEach(friendId => {
      let socketId = userToSocketId.get(friendId);
      socket.to(socketId).emit('friend refresh')
    })
  })
  // //room handlers
  socket.on('join room', (data) => {
    handleJoinRoom(io, socket, data.gameId, data.userId, data.username);
  });



  socket.on('chat message', (data) => {
    io.to(data.gameId).emit('chat message', data);
  })
  socket.on('leave room', (data ) => {
    handleLeaveRoom(io, socket, data.gameId, data.userId);
  });
  socket.on('room deleted', (data) => {
    handleRoomDeleted(data.gameId);
  })

  //game handlers
  handleGameEvents(io, socket);

  socket.on('disconnect', () => {
    console.log('user disconnected: ',socket.id)
    activeUsers.delete(socket.id)
    io.emit('active users', Array.from(activeUsers.values()))
  })
});


server.listen(port, () => {
  console.log(`server is running on ${port} woot!`);
});
