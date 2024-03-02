export class Game{
    constructor(roomId, players = [], dealer = 0, bigBlind){
        this.roomId = roomId;
        this.players = players;
        this.active = false;
        this.pot = 0;
        this.dealer = dealer;
        this.dealerId = this.players[this.dealer];
        this.smallBlindId = this.players[(this.dealer + 1) % this.players.length];
        this.bigBlindId = this.players[(this.dealer + 2) % this.players.length];
        this.round = 0;
        this.turn = (this.dealer + 3) % this.players.length;
        this.bigBlind = bigBlind
        
    }
    nextTurn(){
        console.log('players.length: ', this.players.length)
        this.turn = (this.turn + 1) % this.players.length;
    }
    nextHand(){
        this.dealer = (this.dealer + 1) % this.players.length;
        this.turn = (this.dealer + 3) % this.players.length;
    }
    getCurrentPlayerId(){
        return this.players[this.turn];
    }
}

