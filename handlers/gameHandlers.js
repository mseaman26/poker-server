import {Game} from './Game.js';
import { threePlayerOneAndTwoSplit } from './fixedDecks.js';
const activeGames = new Map();

export function handleGameEvents (io, socket){
    socket.on('start game', (data) => {
        io.to(data.roomId).emit('game started');
        if(!activeGames.has(data.roomId)){
            activeGames.set(data.roomId, new Game(data.roomId, data.players, data.dealer, data.bigBlind, data.buyIn));
        }

        if(activeGames.get(data.roomId).isFrontEndTest){
            activeGames.get(data.roomId).deck.deck = [...threePlayerOneAndTwoSplit];
            activeGames.get(data.roomId).startGameNoShuffle();
            io.to(data.roomId).emit('start game', activeGames.get(data.roomId));
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }else{
            activeGames.get(data.roomId).startGame();
            io.to(data.roomId).emit('start game', activeGames.get(data.roomId));
                io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        
    });
    socket.on('game state', (roomId) => {
        if(activeGames.has(roomId)){
            io.to(roomId).emit('game state', activeGames.get(roomId));
        }
    })

    socket.on('bet', (data) => {
        let game = activeGames.get(data.roomId);
        game.bet(data.amount);
        
        if(game.flipCards){
            socket.to(data.roomId).emit('flip cards', game);
        }else{
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
       
    })
    socket.on('fold', (data) => {
        let game = activeGames.get(data.roomId);
        game.fold();
        if(game.flipCards){
            socket.to(data.roomId).emit('flip cards', game);
        }else{
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
    })
    socket.on('next flip', (data) => {
        let game = activeGames.get(data.roomId);
        game.nextFlip();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        if(game.flipCards){
            socket.to(data.roomId).emit('flip cards', game);
        }
    })
    socket.on('all in', (data) => {
        activeGames.get(data.roomId).players[data.turn].allIn = data.amount;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    });
    socket.on('next hand', (data) => {
        activeGames.get(data.roomId).nextHand();
        io.to(data.roomId).emit('deal');
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done dealing', (data) => {
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('end game', (roomId) => {
        activeGames.delete(roomId);

        io.to(roomId).emit('game state', {});
    });

    

}