// socketHandler.js
const usersInRooms = new Map();

export const handleJoinRoom = (io, socket, room, userId, username) => {
    console.log('joining room: ', room)
    console.log('socket id: ', socket.id)
    console.log('userId: ', userId) 
    if (!usersInRooms.has(room)) {
        usersInRooms.set(room, new Map());
    }
    
    const existingUser = Array.from(usersInRooms.get(room).values()).find(user => user.userId === userId);

    if (!existingUser) {
      usersInRooms.get(room).set(socket.id, { userId, username });
      console.log('usersInRooms: ', usersInRooms)

      io.to(room).emit('userJoined', { userId });

      socket.join(room);
      console.log('emitted updated users in room: ', Array.from(usersInRooms.get(room).values()));
      io.to(room).emit('updated users in room', Array.from(usersInRooms.get(room).values()));
  } else {
      console.log('users in room:', usersInRooms.get(room));
      console.log(`User with userId ${userId} is already in the room.`);
  }
  
}

export const handleLeaveRoom = (io, socket, room, userId) => {
  console.log('usersInRooms before leaving: ', usersInRooms);

  // Check if the room key exists in the usersInRooms Map
  if (usersInRooms.has(room)) {
    console.log('socket id before leaving: ', socket.id);

    // Check if the socket.id key exists in the room Map
    if (usersInRooms.get(room).has(socket.id)) {
      // Remove the socket.id from the room Map
      usersInRooms.get(room).delete(socket.id);
    } else {
      console.error('socket.id not found in the room:', socket.id);
    }
    console.log('usersInRooms after leaving: ', usersInRooms);
    io.to(room).emit('userLeft', { username: 'User' });
    socket.leave(room);

    // Emit the updated users in room event
    console.log('emmited updated users in room: ', Array.from(usersInRooms.get(room).values()));
    io.to(room).emit('updated users in room', Array.from(usersInRooms.get(room).values()));
  } else {
    console.error('Room not found in usersInRooms:', room);
  }
};

export const handleRoomDeleted = (room) => {
  console.log('room deleted: ', room);
  if (usersInRooms.has(room)) {
    usersInRooms.delete(room);
  } else {
    console.error('Room not found in usersInRooms:', room);
  }
}



