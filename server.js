import './env.js'
import { fileURLToPath } from 'url';
import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { handleJoinRoom, handleLeaveRoom, handleRoomDeleted, sendUsersInrooms } from "./handlers/roomHandlers.js";
import { handleGameEvents } from "./handlers/gameHandlers.js";
import apiRoutes  from './api/index.js'
import { config } from 'dotenv';
import path from 'path';
import connectDB from './config/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
const envPath = path.resolve(__dirname, '.env');

// Load environment variables from the specified path
config({ path: envPath });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoutes)

const server = http.createServer(app);

const port = process.env.PORT || 3001;
//

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://www.mikesfriendlypoker.com' : 'http://localhost:3000', // Update with your production app's URL
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

//connect to database
connectDB();

//map for keeping track of online uses
const activeUsers = new Map()
const userToSocketId = new Map()

io.on("connection", (socket) =>   {

  socket.on('activate user', (data) => {
    console.log('activate user ', data)
    if(!activeUsers.has(data.id)){
      activeUsers.set(socket.id, {id: data.id, email: data.email, username: data.username, socketId: socket.id})
      console.log('active users ', activeUsers)
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
  //TEST
  socket.on('test', () => {
    console.log('socket test')
    socket.emit('test', {})
  })


  socket.on('chat message', (data) => {
    io.to(data.gameId).emit('chat message', data);
  })
  socket.on('leave room', (data ) => {
    handleLeaveRoom(io, socket, data.gameId, data.userId);
  });
  socket.on('room deleted', (data) => {
    handleRoomDeleted(data.gameId);
  })
  socket.on('request active games',() => [
    sendUsersInrooms()
  ])

  //game handlers
  handleGameEvents(io, socket, userToSocketId);

  socket.on('disconnect', () => {
    activeUsers.delete(socket.id)
    io.emit('active users', Array.from(activeUsers.values()))
  })
});


server.listen(port, () => {
  console.log(`server is running on ${port} woot!`);
});