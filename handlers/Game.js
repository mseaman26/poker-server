export class Game{
    constructor(roomId, players = []){
        this.roomId = roomId;
        this.players = players;
        this.turn = 0;
        this.active = false;
    }
    nextTurn(){
        console.log('players.length: ', this.players.length)
        this.turn = (this.turn + 1) % this.players.length;
    }
    getCurrentPlayerId(){
        return this.players[this.turn];
    }
}

