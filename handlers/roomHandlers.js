// socketHandler.js
const usersInRooms = new Map();

export const handleJoinRoom = (io, socket, room, userId, username) => {
    if (!usersInRooms.has(room)) {
        usersInRooms.set(room, new Map());
    }
    
    const existingUser = Array.from(usersInRooms.get(room).values()).find(user => user.userId === userId);

    if (!existingUser) {
      const userCount = usersInRooms.get(room).size;
      if (userCount >= 8) {
        socket.emit('room full');
        return;
      }
      usersInRooms.get(room).set(socket.id, { userId, username });
      

      io.to(room).emit('userJoined', { userId });

      socket.join(room);
      io.to(room).emit('updated users in room', Array.from(usersInRooms.get(room).values()));
    } else {
        for (const [socketId, user] of usersInRooms.get(room)) {
            if (user.userId === userId) {
                if (socketId === socket.id) {
                    return;
                }
                usersInRooms.get(room).delete(socketId);
            }
        }
        usersInRooms.get(room).set(socket.id, { userId, username });
        socket.emit('refresh');
      
    }
  
  }

  export const handleLeaveRoom = (io, socket, room, userId) => {

    // Check if the room key exists in the usersInRooms Map
    if (usersInRooms.has(room)) {

      // Check if the socket.id key exists in the room Map
      if (usersInRooms.get(room).has(socket.id)) {
        // Remove the socket.id from the room Map
        usersInRooms.get(room).delete(socket.id);
      } else {
        console.error('socket.id not found in the room:', socket.id);
      }
      io.to(room).emit('userLeft', { username: 'User' });
      socket.leave(room);

      // Emit the updated users in room event
      io.to(room).emit('updated users in room', Array.from(usersInRooms.get(room).values()));
    } else {
      console.error('Room not found in usersInRooms:', room);
    }
  };

export const handleRoomDeleted = (room) => {
  if (usersInRooms.has(room)) {
    usersInRooms.delete(room);
  } else {
    console.error('Room not found in usersInRooms:', room);
  }
}



