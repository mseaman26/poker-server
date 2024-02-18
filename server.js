import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

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

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('activate user', (data) => {
    console.log('data into server socket: ', data)
    if(!activeUsers.has(data.id)){
      activeUsers.set(socket.id, {id: data.id, email: data.email, username: data.username, socketId: socket.id})
      userToSocketId.set(data.id, socket.id)
      console.log('userId to socket id: ', userToSocketId)
    }
    console.log('array being sent to everyone after activating user: ', Array.from(activeUsers.values()))
    io.emit('active users', Array.from(activeUsers.values()))
  })
  socket.on('request active users', () => {
    console.log('raw map: ', activeUsers)
    console.log('userToSocketId: ',userToSocketId)
    console.log('sending array from server to everyone ', Array.from(activeUsers.values()))
    io.emit('active users', Array.from(activeUsers.values()))
  })
  socket.on('friend change', (data) => {
    console.log('friend change event, userID: ', data.userId)
    let socketId = userToSocketId.get(data.userId)
    console.log('socket id of friend: ', socketId)
    socket.to(socketId).emit('friend change')
  })
  socket.on('friend refresh', (data) => {
    console.log('refresh user: ', data )
    console.log(userToSocketId)
    let socketId = userToSocketId.get(data.friendId);
    console.log('socket id of friend in user refresh: ', socketId)
    socket.to(socketId).emit('user refresh')
  })
  socket.on('disconnect', () => {
    console.log('user disconnected: ',socket.id)
    activeUsers.delete(socket.id)
    io.emit('active users', Array.from(activeUsers.values()))
  })
});


server.listen(port, () => {
  console.log(`server is running on ${port} woot!`);
});
