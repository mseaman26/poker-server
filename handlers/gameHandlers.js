import {Game} from './Game.js';
import { threePlayerOneAndTwoSplit } from './fixedDecks.js';
const activeGames = new Map();

export function handleGameEvents (io, socket){
    socket.on('start game', (data) => {
        console.log('start game data: ', data)
        io.to(data.roomId).emit('game started');
        if(!activeGames.has(data.roomId)){
            activeGames.set(data.roomId, new Game(data.roomId, data.players, data.dealer, data.bigBlind, data.buyIn));
        }
        // activeGames.get(data.roomId).active = true;
        // let players = activeGames.get(data.roomId).players;
        // for(let i = 0; i < players.length; i++){
        //     players[i].chips = data.buyIn;
        // }
        // for(let i = 0; i < players.length; i++){
        //     players[i].moneyInPot = 0;
        // }
        // let dealer = (activeGames.get(data.roomId).dealer)
        // players[(dealer + 1) % players.length].chips -= data.bigBlind / 2;
        // players[(dealer + 1) % players.length].bet = data.bigBlind / 2;  
        // players[(dealer + 1) % players.length].moneyInPot = data.bigBlind / 2;
        // players[(dealer + 2) % players.length].chips -= data.bigBlind;
        // players[(dealer + 2) % players.length].bet = data.bigBlind;
        // players[(dealer + 2) % players.length].moneyInPot = data.bigBlind;
        // activeGames.get(data.roomId).pot += data.bigBlind + data.bigBlind / 2;
        // activeGames.get(data.roomId).currentBet = data.bigBlind;

        // console.log('active games: ', activeGames);
        // console.log('game: ', activeGames.get(data.roomId));
        // console.log('players: ', activeGames.get(data.roomId).players);
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
    // socket.on('next turn', async (data) => {
    //     console.log('roomId: ', data.roomId)
    //     console.log('actve games: ', activeGames)
    //     let game = activeGames.get(data.roomId);
    //     let currentRound = game.round;
    //     console.log('current round: ', currentRound)
    //     await activeGames.get(data.roomId).nextTurn();
    //     io.to(data.roomId).emit('game state', activeGames.get(data.roomId));

    // });
    socket.on('bet', (data) => {
        console.log('bet data: ', data)
        let game = activeGames.get(data.roomId);
        game.bet(data.amount);
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        if(game.flipCards){
            socket.to(data.roomId).emit('flip cards', game);
        }
        
       
    })
    socket.on('fold', (data) => {
        console.log('fold data: ', data)
        // activeGames.get(data.roomId).players[data.turn].folded = true;
        // activeGames.get(data.roomId).foldedCount += 1;
        // activeGames.get(data.roomId).nextTurn();
        activeGames.get(data.roomId).fold();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('next flip', (data) => {
        console.log('next flip roomId: ', data.roomId)  
        let game = activeGames.get(data.roomId);
        game.nextFlip();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
        if(game.flipCards){
            socket.to(data.roomId).emit('flip cards', game);
        }
    })
    socket.on('all in', (data) => {
        console.log('all in data: ', data)
        activeGames.get(data.roomId).players[data.turn].allIn = data.amount;
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    });
    socket.on('next hand', (data) => {
        console.log('next hand data: ', data)
        activeGames.get(data.roomId).nextHand();
        io.to(data.roomId).emit('game state', activeGames.get(data.roomId));
    })
    socket.on('end game', (roomId) => {
        console.log('game ended: ', roomId)
        activeGames.delete(roomId);
        // activeGames.get(roomId).active = false;
        console.log('active games: ', activeGames)
        socket.to(roomId).emit('game ended');
        io.to(roomId).emit('game state', {});
    });

    

}