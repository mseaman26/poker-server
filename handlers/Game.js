export class Game{
    constructor(roomId, players = []){
        this.roomId = roomId;
        this.players = players;
        this.turn = 0;
        this.active = false;
        this.pot = 0;
        this.dealer = 0;
        this.dealerId = this.players[this.dealer];
        this.smallBlindId = this.players[(this.dealer + 1) % this.players.length];
        this.bigBlindId = this.players[(this.dealer + 2) % this.players.length];
        this.round = 0;
    }
    nextTurn(){
        console.log('players.length: ', this.players.length)
        this.turn = (this.turn + 1) % this.players.length;
    }
    nextHand(){
        this.dealer = (this.dealer + 1) % this.players.length;
        this.turn = (this.dealer + 1) % this.players.length;
    }
    getCurrentPlayerId(){
        return this.players[this.turn];
    }
}

