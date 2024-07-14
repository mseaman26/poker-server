import {Game} from './Game.js';
import { threePlayerOneAndTwoSplit } from './fixedDecks.js';
import { checkDeck } from '../lib/helpers.js';

const activeGames = new Map();




function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
  function deepMerge(target, source) {
    if (!target) target = {};
  
    for (const key in source) {
        if (isObject(source[key])) {
            if (!(key in target)) {
                Object.assign(target, { [key]: {} });
            }
            deepMerge(target[key], source[key]);
        } else if (Array.isArray(source[key])) {
            if (!Array.isArray(target[key])) {
                target[key] = [];
            }
            target[key] = target[key].concat(source[key]);
        } else {
            Object.assign(target, { [key]: source[key] });
        }
    }
    return target;
}

function emitGameStateToPlayers(io, gameState, usersInRooms) {
    gameState.players.forEach(player => {
      const socketId = usersInRooms.get(player.userId);
  
      if (socketId) {
        // Create a copy of the game state with only the current player's cards or any cards that should be visible to all players
        const playerSpecificGameState = {
            ...gameState,
            players: gameState.players.map(p => ({
                ...p,
                pocket: p.userId === player.userId || p.showCards ? p.pocket : []
            }))
        };
  
        // Emit the modified game state to the specific player
        io.to(socketId).emit('game state', playerSpecificGameState);
      }
    });
}

export function handleGameEvents (io, socket, userToSocketId) {

    socket.on('start game', (data) => {
        io.to(data.roomId).emit('game started');
        if(!activeGames.has(data.roomId)){
            activeGames.set(data.roomId, new Game(data.roomId, data.players, data.dealer, data.bigBlind, data.buyIn));
        }

        if(activeGames.get(data.roomId).isFrontEndTest){
            activeGames.get(data.roomId).deck.deck = [...threePlayerOneAndTwoSplit];
            activeGames.get(data.roomId).startGameNoShuffle();
            io.to(data.roomId).emit('start game', activeGames.get(data.roomId));
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }else{
            activeGames.get(data.roomId).startGame();
            io.to(data.roomId).emit('start game', activeGames.get(data.roomId));
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        
    });
    socket.on('game state', (roomId) => {
        if(activeGames.has(roomId)){
            if(process.env !== 'production' && !checkDeck(activeGames.get(roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(roomId), userToSocketId);
            // io.to(roomId).emit('game state', activeGames.get(roomId));
        }
    })

    socket.on('bet', (data) => {
        let game = activeGames.get(data.roomId);
        io.to(data.roomId).emit('room id test', data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.bet(data.amount);
        
        if(game.flipCards){
            console.log('come on snapshot', game.snapShot)
            io.to(data.roomId).emit('snapshot', game.snapShot);
            
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            io.to(data.roomId).emit('flip cards', game);
        }
        else if(game.flopping){
            io.to(data.roomId).emit('flopping', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.turning){
            io.to(data.roomId).emit('turning', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.rivering){
            io.to(data.roomId).emit('rivering', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else{
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
       
    })
    socket.on('done flopping', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.flopping = false;
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done flipping', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.flipCards = false;
        for(let i = 0; i < game.players.length; i++){
            game.handHandler.hand = [...game.players[i].pocket.concat(game.flop)];
            game.players[i].actualHand = game.handHandler.findHand();
        }
        game.handleNumericalHands();
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done turning', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.turning = false;
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done rivering', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.rivering = false;
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('fold', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.fold();
        if(game.winByFold){
            io.to(data.roomId).emit('win by fold');
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
            game.winByFold = false;
        }
        else if(game.flipCards){
            console.log('flip cards has been set to true')
            io.to(data.roomId).emit('snapshot', game.snapShot);
            io.to(data.roomId).emit('flip cards', game);
        }
        else if(game.flopping){
            io.to(data.roomId).emit('flopping', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.turning){
            io.to(data.roomId).emit('turning', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else if(game.rivering){
            io.to(data.roomId).emit('rivering', game);
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
        else{
            if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
                throw new Error('bad deck');
            }
            emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
            // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        }
    })
    socket.on('next flip', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.nextFlip();
        console.log('next flip received from client')
        console.log('game round', game.round)
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        if(game.flipCards){
            io.to(data.roomId).emit('flip cards', game);
        }
    })
    socket.on('all in', (data) => {
        console.log('all in received from client')
        let game = activeGames.get(data.roomId);
        socket.to(data.roomId).emit('all in', {amount: data.amount + game.players[data.turn].bet, playerIndex: data.turn});
        if(!game){
            console.log('game not found')
            return;
        }
        game.players[data.turn].allIn = data.amount
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', game);
    });
    socket.on('next hand', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        activeGames.get(data.roomId).nextHand();
        if(process.env !== 'production' && process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        io.to(data.roomId).emit('deal', activeGames.get(data.roomId));
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('done dealing', (data) => {
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('buy back', (data) => {
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        activeGames.get(data.roomId).buyBack(data.playerIndex, data.amount);
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('add player', (data) => {
        console.log('add player event received')
        console.log('data: ', data)   
        activeGames.get(data.roomId).addPlayer(data.player);
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('remove player', (data) => {
        console.log('remove player event received')
        activeGames.get(data.roomId).removePlayer(data.playerIndex);
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('flip folded cards', (data) => {
        const game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        game.players[data.playerIndex].showCards = true;
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }

        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
    })
    socket.on('change blinds', (data) => {
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        console.log('change blinds event received')
        game.changeBlinds(data.newBigBlind);
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', game);
    });
    socket.on('resume game', (data) => {
        console.log('data.state.players in resume game: ', data.state.players)
        let game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found, making new game')
            activeGames.set(data.roomId, new Game(data.roomId, data.players, data.dealer, data.bigBlind, data.buyIn));
        }
        game = activeGames.get(data.roomId);
        if(!game){
            console.log('game not found, something went wrong create new game')
            return;
        }
        deepMerge(game, data.state);
        game.players = data.state.players;
        console.log('game after merge', game)
        if(process.env !== 'production' && !checkDeck(activeGames.get(data.roomId))){
            throw new Error('bad deck');
        }
        emitGameStateToPlayers(io, activeGames.get(data.roomId), userToSocketId);
        // io.to(data.roomId).emit('game state', game);
    })
    socket.on('end game', (roomId) => {
        let game = activeGames.get(roomId);
        if(!game){
            console.log('game not found')
            return;
        }
        activeGames.delete(roomId);
        io.to(roomId).emit('end game', {});
        if(process.env !== 'production' && !checkDeck(activeGames.get(roomId))){
            throw new Error('bad deck');
        }
        io.to(roomId).emit('game state', {});
    });

    

}