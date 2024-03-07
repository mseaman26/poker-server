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
        this.currentBet = 0;
        this.betIndex = null
        this.foldedCount = 0;

    }
    nextTurn(){
        console.log('players.length: ', this.players.length)
        this.turn = (this.turn + 1) % this.players.length;
    }
    nextRound(){
        this.round += 1;
        this.currentBet = 0;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
        }
        this.turn = (this.dealer + 1) % this.players.length;
        this.betIndex = null;
    }
    nextHand(){
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
        }
        this.dealer = (this.dealer + 1) % this.players.length;
        this.turn = (this.dealer + 3) % this.players.length;
        this.round = 0;
        this.pot = 0;
        this.currentBet = 0;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].folded = false;
        }
        //setting up blinds
        this.players[(this.dealer + 1) % this.players.length].chips -= this.bigBlind / 2;
        this.players[(this.dealer + 1) % this.players.length].bet = this.bigBlind / 2;
        this.players[(this.dealer + 2) % this.players.length].chips -= this.bigBlind;
        this.players[(this.dealer + 2) % this.players.length].bet = this.bigBlind;
        this.pot += this.bigBlind + this.bigBlind / 2;
        this.currentBet = this.bigBlind;
        this.betIndex = null;
    }
    bet(amount){
        console.log('current bet: ', this.currentBet)
        console.log('amount: ', amount)
        console.log('already bet: ', this.players[this.turn].bet)
        if(this.players[this.turn].bet + amount > this.currentBet){
            console.log('new bet index')
            this.betIndex = this.turn;
        }
        if(this.betIndex === null){
            this.betIndex = this.turn;
        }
        this.currentBet = amount + this.players[this.turn].bet;
        this.pot += amount;
        this.players[this.turn].chips -= amount;
        
        this.players[this.turn].bet += amount;
        this.players[this.turn].moneyInPot += amount;
        
       
        // if(!activeGames.get(data.roomId).betIndex){
        //     activeGames.get(data.roomId).betIndex = data.turn;
        // }
        // activeGames.get(data.roomId).players[data.turn].bet = data.amount;
        this.nextTurn();    
    }
    winHand(){
        this.players[this.turn].chips += this.pot;
        this.foldedCount = 0;
        this.nextHand();
    }

}

