
import { Deck } from "./Deck.js";
export class Game{
    constructor(roomId, players = [], dealer = 0, bigBlind, buyIn){
        this.roomId = roomId;
        this.players = players;
        this.active = false;
        this.pot = 0;
        this.buyIn = buyIn;
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
        this.allInCount = 0;
        this.carryOver = 0;
        this.deck = new Deck();
        
    }
    startGame(){
        this.active = true;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].chips = this.buyIn;
            this.players[i].allIn = null;
            this.players[i].bet = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].moneyInPot = 0;
        }

        this.players[(this.dealer + 1) % this.players.length].chips -= this.bigBlind / 2;
        this.players[(this.dealer + 1) % this.players.length].bet = this.bigBlind / 2;
        this.players[(this.dealer + 2) % this.players.length].chips -= this.bigBlind;
        this.players[(this.dealer + 2) % this.players.length].bet = this.bigBlind;
        this.pot += this.bigBlind + this.bigBlind / 2;
        this.currentBet = this.bigBlind;
    }
    
    nextTurn(){
        if(this.foldedCount === this.players.length - 1){
            console.log('winning hand')
            return
        }
        this.turn = (this.turn + 1) % this.players.length;
        if(this.turn === this.betIndex){
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].bet, this.players[i].allIn);
                    }
                    console.log('total newMax: ', newMax)
                    this.players[i].maxWin = newMax;
                }
            }
            this.nextRound();
            return
        }
        else if(this.players[this.turn].folded === true){
            this.nextTurn();
        }
        else if(this.players[this.turn].allIn !== null){
            this.nextTurn();
        }

        
    }
    nextRound(){
        this.round += 1;
        this.currentBet = 0;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
        }
        
        this.betIndex = null;
        this.turn = this.dealer;
        this.nextTurn();
    }
    nextHand(){
        this.players = this.players.filter(player => player.chips > 0);
        console.log('players after removal: ', this.players)
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].allIn = null;
            this.players[i].moneyInPot = 0;
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
        if(this.players[(this.dealer + 1) % this.players.length].chips <= this.bigBlind / 2){
            this.players[(this.dealer + 1) % this.players.length].bet = this.players[(this.dealer + 1) % this.players.length].chips;
            this.players[(this.dealer + 1) % this.players.length].moneyInPot = this.players[(this.dealer + 1) % this.players.length].chips;
            // this.players[(this.dealer + 1) % this.players.length].moneyInPot = this.players[(this.dealer + 1) % this.players.length].chips;
            this.pot += this.players[(this.dealer + 1) % this.players.length].chips;
            this.players[(this.dealer + 1) % this.players.length].allIn = this.players[(this.dealer + 1) % this.players.length].chips;
            this.players[(this.dealer + 1) % this.players.length].chips = 0;
            this.currentBet = this.players[(this.dealer + 1) % this.players.length].chips;
            
        }else{
            this.players[(this.dealer + 1) % this.players.length].chips -= this.bigBlind / 2;
            this.players[(this.dealer + 1) % this.players.length].moneyInPot = this.bigBlind / 2;
            this.players[(this.dealer + 1) % this.players.length].bet = this.bigBlind / 2;
            this.currentBet = this.bigBlind / 2;
            this.pot += this.bigBlind / 2;
        }

        if(this.players[(this.dealer + 2) % this.players.length].chips <= this.bigBlind)
        {
            this.players[(this.dealer + 2) % this.players.length].bet = this.players[(this.dealer + 2) % this.players.length].chips;
            this.players[(this.dealer + 2) % this.players.length].moneyInPot = this.players[(this.dealer + 2) % this.players.length].chips;
            this.pot += this.players[(this.dealer + 2) % this.players.length].chips;
            this.players[(this.dealer + 2) % this.players.length].allIn = this.players[(this.dealer + 2) % this.players.length].chips;
            this.players[(this.dealer + 2) % this.players.length].chips = 0;
        }else{
            this.players[(this.dealer + 2) % this.players.length].chips -= this.bigBlind;
            this.players[(this.dealer + 2) % this.players.length].moneyInPot = this.bigBlind;
            this.players[(this.dealer + 2) % this.players.length].bet = this.bigBlind;
            this.pot += this.bigBlind;
            this.currentBet = this.bigBlind;
        }

        this.betIndex = null;
    }
    bet(amount){
        // for(let i = 0; i < this.players.length; i++){
        //     if(this.players[i].allIn !== null){
        //         let newMax = 0
        //         for(let j = 0; j < this.players.length; j++){
        //             newMax += Math.min(this.players[j].bet, this.players[i].allIn);
        //         }
        //         this.players[i].maxWin = newMax;
        //     }
        // }
        if(this.players[this.turn].bet + amount > this.currentBet){
            this.betIndex = this.turn;
        }
        if(this.betIndex === null){
            this.betIndex = this.turn;
        }
        if(!(amount + this.players[this.turn].bet < this.currentBet)){
            this.currentBet = amount + this.players[this.turn].bet;
            // this.players[this.turn].allIn = amount + this.players[this.turn].bet;
        }
        this.pot += amount;
        if(this.players[this.turn].chips <= amount){
            this.players[this.turn].allIn = this.players[this.turn].chips;
            this.allInCount += 1;
            this.players[this.turn].chips = 0;
            this.players[this.turn].moneyInPot += this.players[this.turn].allIn;
            this.players[this.turn].bet += this.players[this.turn].allIn;
        }else{
            this.players[this.turn].chips -= amount;
            this.players[this.turn].moneyInPot += amount;
            this.players[this.turn].bet += amount;
        }

        
        
        this.nextTurn();    
    }
    fold(){
        this.players[this.turn].folded = true;
        this.foldedCount += 1;
        this.nextTurn();
    }
    winHand(turn){
        this.players[turn].chips += this.pot;
        this.foldedCount = 0;
        this.nextHand();
    }
    handleNumericalHands(){
        let nonFoldedPlayers = this.players.filter(player => player.folded === false);
        console.log('players: ', this.players);
        let hands = nonFoldedPlayers.map((player, index) => {
            return { index: index, numericalHand: player.numericalHand, allIn: player.allIn };
        });
        
        console.log('hands:', hands);
        
        const groupedHands = {};
        for (let i = 0; i < hands.length; i++) {
            const key = hands[i].numericalHand;
            if (groupedHands[key]) {
                groupedHands[key].push(hands[i]);
            } else {
                groupedHands[key] = [hands[i]];
            }
        }
        
        let handledHands = Object.values(groupedHands).map(group => {
            return group.sort((a, b) => {
                // Handle null values by placing them at the end
                if (a.allIn === null && b.allIn === null) {
                    return 0;
                } else if (a.allIn === null) {
                    return 1; // Place null at the end
                } else if (b.allIn === null) {
                    return -1; // Place null at the end
                }
        
                return a.allIn - b.allIn; // Sort by allIn amount
            });
        });
        
        handledHands.sort((a, b) => b[0].numericalHand - a[0].numericalHand);
        
        console.log('handledHands:', handledHands);
        
        //
        for(let i = 0; i < handledHands.length; i++){
            if(this.pot > 0){
                for(let j = 0; j < handledHands[i].length; j++){
                    //if current winner is not all in
                    if(this.players[handledHands[i][j].index].allIn === null){
                        console.log(handledHands[i][j].index, " won all the chips and gets: ", this.pot, " chips.")
                        this.players[handledHands[i][j].index].chips += this.pot;
                        this.pot = 0;
                    }else{
                    //if current winner is all in
                        let splitPot = 0
                        for(let k = 0; k < this.players.length; k++){
                            splitPot += Math.min(this.players[k].moneyInPot, this.players[handledHands[i][j].index].allIn);
                        }
                        console.log(handledHands[i][j].index, " won a portion of the chips and gets: ", splitPot, " chips.")
                        let carryOver = this.pot % handledHands[i].length;
                        console.log('carryOver: ', carryOver)
                        this.players[handledHands[i][j].index].chips += splitPot;
                        this.pot -= splitPot;
                    }
                }
                for(let k = 0; k < this.players.length; k++){
                    this.players[k].moneyInPot = 0;
                    this.players[k].bet = 0;
                }
                if(this.carryOver){
                    this.pot += this.carryOver;
                    this.carryOver = 0; 
                }
                // if(this.players[ handledHands[i][0].index].allIn === null){
                //     let splitPot = Math.floor(this.pot / handledHands[i].length);
                //     let carryOver = this.pot % handledHands[i].length;
                //     for(let j = 0; j < handledHands[i].length; j++){
                //         this.players[handledHands[i][j].index].chips += splitPot;
                //     }
                // } else{
                //     //if all in
                // }         
            }
            // else{
            //     this.nextHand();
            // }
        }
        
    }
}

