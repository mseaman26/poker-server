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
        io.to(data.roomId).emit('room id test', data.roomId);
        game.bet(data.amount);
        
        if(game.flipCards){
            console.log('flip cards being emitted from server')
            //io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
            io.to(data.roomId).emit('flip cards', game);
        }
        else if(game.flopping){
            io.to(data.roomId).emit('flopping', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.turning){
            io.to(data.roomId).emit('turning', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.rivering){
            io.to(data.roomId).emit('rivering', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else{
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
       
    })
    socket.on('done flopping', (data) => {
        let game = activeGames.get(data.roomId);
        game.flopping = false;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done flipping', (data) => {
        let game = activeGames.get(data.roomId);
        game.flipCards = false;
        for(let i = 0; i < game.players.length; i++){
            game.handHandler.hand = [...game.players[i].pocket.concat(game.flop)];
            game.players[i].actualHand = game.handHandler.findHand();
        }
        game.handleNumericalHands();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done turning', (data) => {
        let game = activeGames.get(data.roomId);
        game.turning = false;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done rivering', (data) => {
        let game = activeGames.get(data.roomId);
        game.rivering = false;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('fold', (data) => {
        let game = activeGames.get(data.roomId);
        game.fold();
        if(game.winByFold){
            io.to(data.roomId).emit('win by fold');
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
            game.winByFold = false;
        }
        else if(game.flipCards){
            console.log('flip cards has been set to true')
            io.to(data.roomId).emit('flip cards', game);
        }
        else if(game.flopping){
            io.to(data.roomId).emit('flopping', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.turning){
            io.to(data.roomId).emit('turning', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.rivering){
            io.to(data.roomId).emit('rivering', game);
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else{
            io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
    })
    socket.on('next flip', (data) => {
        let game = activeGames.get(data.roomId);
        game.nextFlip();
        console.log('next flip received from client')
        console.log('game round', game.round)
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        if(game.flipCards){
            io.to(data.roomId).emit('flip cards', game);
        }
    })
    socket.on('all in', (data) => {
        activeGames.get(data.roomId).players[data.turn].allIn = data.amount;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    });
    socket.on('next hand', (data) => {
        activeGames.get(data.roomId).nextHand();
        io.to(data.roomId).emit('deal', activeGames.get(data.roomId));
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done dealing', (data) => {
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('buy back', (data) => {
        activeGames.get(data.roomId).buyBack(data.playerIndex, data.amount);
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('add player', (data) => {
        console.log('add player event received')
        console.log('data: ', data)   
        activeGames.get(data.roomId).addPlayer(data.player);
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('remove player', (data) => {
        console.log('remove player event received')
        activeGames.get(data.roomId).removePlayer(data.playerIndex);
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('flip on win by fold', (data) => {
        console.log('flip on win by fold event received')
        io.to(data.roomId).emit('flip on win by fold');
    })
    socket.on('end game', (roomId) => {
        activeGames.delete(roomId);
        io.to(roomId).emit('end game', {});
        io.to(roomId).emit('game state', {});
    });

    

}