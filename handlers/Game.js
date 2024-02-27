export class Game{
    constructor(roomId, players = []){
        this.roomId = roomId;
        this.players = players;
        this.turn = 0;
        this.active = false;
    }
    nextTurn(){
        this.turn = (this.turn + 1) % this.players.length;
    }
}

