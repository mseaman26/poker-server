// socketHandler.js
const usersInRooms = new Map();

export const handleJoinRoom = (io, socket, room, userId) => {
    console.log('joining room: ', room)
    console.log('socket id: ', socket.id)
    console.log('userId: ', userId) 
    if (!usersInRooms.has(room)) {
        usersInRooms.set(room, new Map());
    }
    
    usersInRooms.get(room).set(socket.id, { room, userId});
    console.log('usersInRooms: ', usersInRooms)

    io.to(room).emit('userJoined', { userId });

    socket.join(room);

    io.to(room).emit('updateUserList', Array.from(usersInRooms.get(room).values()));
}

export const handleLeaveRoom = (io, socket, room, userId) => {
  console.log('handleLeaveRoom: ', room)
  console.log('usersInRooms before leaving: ', usersInRooms)
  console.log('socket id before leaving: ', socket.id)
  usersInRooms.get(room).delete(socket.id);
  console.log('usersInRooms after leaving: ', usersInRooms)

  io.to(room).emit('userLeft', { username: 'User' });

  socket.leave(room);
  
  io.to(room).emit('updateUserList', Array.from(usersInRooms.get(room).values()));
}

// export const handleDisconnectFromRoom = (io, socket) => {
//   usersInRooms.forEach((roomUsers, room) => {
//     if (roomUsers.has(socket.id)) {
//       roomUsers.delete(socket.id);

//       io.to(room).emit('userLeft', { username: 'User' });

//       io.to(room).emit('updateUserList', Array.from(roomUsers.values()));
//     }
//   });
// }


