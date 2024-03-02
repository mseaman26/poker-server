import {Game} from './Game.js';
const activeGames = new Map();

export function handleGameEvents (io, socket){
    socket.on('start game', (data) => {
        console.log('start game data: ', data)
        io.to(data.roomId).emit('game started');
        if(!activeGames.has(data.roomId)){
            activeGames.set(data.roomId, new Game(data.roomId, data.players, data.dealer, data.bigBlind));
        }
        activeGames.get(data.roomId).active = true;
        let players = activeGames.get(data.roomId).players;
        for(let i = 0; i < players.length; i++){
            players[i].chips = data.buyIn;
        }
        console.log('active games: ', activeGames);
        console.log('game: ', activeGames.get(data.roomId));
        console.log('players: ', activeGames.get(data.roomId).players);
        io.to(data.roomId).emit('start game', activeGames.get(data.roomId));
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    });
    socket.on('game state', (roomId) => {
        console.log('active games inside game state: ', activeGames)
        console.log('game state requested: ', roomId)
        if(activeGames.has(roomId)){
            console.log('emitting game state')
            io.to(roomId).emit('game state', activeGames.get(roomId));
        }
        // else{
        //     io.to(roomId).emit('game state', {});
        // }
    })
    socket.on('next turn', async (data) => {
        console.log('roomId: ', data.roomId)
        console.log('actve games: ', activeGames)
        await activeGames.get(data.roomId).nextTurn();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));

    });
    socket.on('next hand', async (roomId, callback) => {
        console.log('roomId: ', roomId)
        console.log('actve games: ', activeGames)   
        await activeGames.get(roomId).nextHand();
        io.to(roomId).emit('next hand', activeGames.get(roomId));
        io.to(roomId).emit('game state', activeGames.get(roomId));
        callback();

    });
    socket.on('end game', (roomId) => {
        console.log('game ended: ', roomId)
        activeGames.delete(roomId);
        // activeGames.get(roomId).active = false;
        console.log('active games: ', activeGames)
        socket.to(roomId).emit('game ended');
        io.to(roomId).emit('game state', {});
    });

    

}