import {Game} from './Game.js';
const activeGames = new Map();

export function handleGameEvents(io, socket){
    socket.on('start game', (data) => {
        console.log('players: ', data.players)
        io.to(data.roomId).emit('game started');
        const game = new Game(data.roomId, data.players);
        if(!activeGames.has(data.roomId)){
            activeGames.set(data.roomId, game);
        }
        game.active = true;
        console.log('active games: ', activeGames);
        console.log('game: ', game);
        console.log('players: ', game.players);
    });
    socket.on('end game', (roomId) => {
        io.to(roomId).emit('game ended');
    });

    socket.on('next turn', (roomId) => {
        io.to(roomId).emit('next turn');
    });

}