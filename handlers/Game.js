
import { Deck } from "./Deck.js";
import { HandHandler } from "./handHandler.js";
import { rankHands } from "./rankHands.js";
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
        this.turn = (this.dealer + 1) % this.players.length;
        this.bigBlind = bigBlind
        this.currentBet = 0;
        this.betIndex = null
        this.foldedCount = 0;
        this.allInCount = 0;
        this.eliminatedCount = 0;
        this.carryOver = 0;
        this.deck = new Deck();
        this.totalChips = 0;
        this.maxBet = this.buyIn;
        this.hand = 0
        this.flop = []
        this.handHandler = new HandHandler();
        this.isTest = false;
        this.isFrontEndTest = false;
        this.nextHandCallCount = 0;
        this.nextHandNoShuffleCallCount = 0;
        this.flipCards = false
        this.handComplete = false
        this.handWinnerInfo = []
        this.flopping = false
        this.turning = false
        this.rivering = false
        this.dealing = false
        this.winByFold = false
    }

    startGame(){
        this.handComplete = false
        this.winByFold = false
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();

        
        this.active = true;
        for(let i = 0; i < this.players.length; i++){
            this.totalChips += this.buyIn;
            this.players[i].eliminated = false;
            this.players[i].chips = this.buyIn;
            this.players[i].allIn = null;
            this.players[i].bet = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].moneyInPot = 0;
            this.players[i].numericalHand = null;
            this.players[i].action = ''
            this.players[i].actionAmount = 0
        }
        this.bet(Math.floor(this.bigBlind / 2));
        this.players[(this.turn + this.players.length - 1) % this.players.length].action = ''
        this.players[(this.turn + this.players.length - 1) % this.players.length].actionAmount = 0
        this.bet(Math.floor(this.bigBlind));
        this.players[(this.turn + this.players.length - 1) % this.players.length].action = ''
        this.players[(this.turn + this.players.length - 1) % this.players.length].actionAmount = 0
        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }
    nextTurn(){

        
       if(this.foldedCount + this.eliminatedCount === this.players.length - 1){
            //win by fold
            this.winByFold = true
            this.handComplete = true
            for(let i = 0; i < this.players.length; i++){
                //setting every players possible max win amount
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].bet, this.players[i].allIn);
                    }
                    this.players[i].maxWin = newMax;
                }
                if(this.players[i].folded === false){
                    //give money to winner by fold
                    this.handWinnerInfo.push({player: this.players[i]})
                    this.players[i].chips += this.pot;
                    this.pot = 0;
                    if(this.isTest){
                        this.nextHandNoShuffle();
                        return
                    }
                    if(this.isFrontEndTest){
                        this.nextHandNoShuffle();
                        return
                    }
                    // this.nextHand();
                }
                
            }
            // this.nextHand()
           

            // this.handleNumericalHands();
            return
        }
        else if(this.allInCount + this.foldedCount + this.eliminatedCount >= this.players.length -1 && this.currentBet === 0 && this.players.length > 1){
            //flip cards
            console.log('flip cards in game object')
            for(let i = 0; i < this.players.length; i++){
                //setting every players possible max win amount
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].moneyInPot, this.players[i].allIn);
                    }
                    this.players[i].maxWin = newMax;
                }
            }
            // for(let i = 0; i < this.players.length; i++){
            //     this.players[i].moneyInPot = 0;
            // }
            while(this.flop.length < 5){
                this.flop.push(this.deck.dealCard());
            }
            console.log('flop within game object after flip cards', this.flop)
            this.turn = null
            this.flipCards = true

            return
        }
        else{

            this.turn = (this.turn + 1) % this.players.length;
            if(this.turn === this.betIndex){
                //square pot
                for(let i = 0; i < this.players.length; i++){
                    if(this.players[i].allIn !== null){
                        let newMax = 0
                        for(let j = 0; j < this.players.length; j++){
                            newMax += Math.min(this.players[j].bet, this.players[i].allIn);
                        }
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
            else if(this.players[this.turn].chips <= 0){
                this.nextTurn();
            }
            else if(this.players[this.turn].eliminated === true){
                this.nextTurn();
            }
        } 
    }
    nextRound(){
        if(this.allInCount + this.foldedCount === this.players.length - 1){
            this.turn = null
            while(this.flop.length < 5){
                this.flop.push(this.deck.dealCard());
            }
            this.flipCards = true
            return
        }
        if(this.round === 0){
            this.flopping = true
            this.flop = this.deck.dealFlop();
        }
        
        else if(this.round === 1){
            this.turning = true
            this.flop.push(this.deck.dealCard());
        }
        else if(this.round === 2){
            this.rivering = true
            this.flop.push(this.deck.dealCard());
            //attaching the hand info to send to the front end
            for(let i = 0; i < this.players.length; i++){
                this.handHandler.hand = [...this.players[i].pocket.concat(this.flop)];
                this.players[i].actualHand = this.handHandler.findHand();
            }
        }
        else{
            this.handleNumericalHands();
            return
        }
       
        this.round += 1;
        this.currentBet = 0;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].action = ''
            this.players[i].actionAmount = 0
        }
        
        this.betIndex = null;
        this.turn = this.dealer;
        this.nextTurn();
    }
    nextFlip(){
        if(this.round === 0){
            this.flop = this.deck.dealFlop();
            this.round += 1;
            return
        }
        
        else if(this.round === 1){
            this.flop.push(this.deck.dealCard());
            this.round += 1;
            return
        }
        else if(this.round === 2){
            this.flop.push(this.deck.dealCard());
            //attaching the hand info to send to the front end
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].pocket){
                    this.handHandler.hand = [...this.players[i].pocket.concat(this.flop)];
                    this.players[i].actualHand = this.handHandler.findHand();
                }
                
            }
            this.round += 1;
            return
        }else{
            this.flipCards = false
            this.handleNumericalHands();
            return
        
        }
    }
    nextHand(){
        this.handComplete = false
        this.winByFold = false
        this.nextHandCallCount++
        this.deck.deck = []
        this.deck.createDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.flop = [];
        this.handWinnerInfo = []

        while(true){
            this.dealer = (this.dealer + 1) % this.players.length;
            if(this.players[this.dealer].chips > 0){
                break
            }
        }
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].chips <= 0 && this.players[i].eliminated === false){
                this.players[i].pocket = []
                this.players[i].eliminated = true;
                this.players[i].action = ''
                this.players[i].actionAmount = 0
                this.eliminatedCount++
            }
            this.players[i].isWinner = false;
        }
        //set maxBet to second Highest chip holder's chip amount
        let secondHighest = 0
        let highest = 0
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].chips > highest){
                secondHighest = highest
                highest = this.players[i].chips
            }else if(this.players[i].chips > secondHighest){
                secondHighest = this.players[i].chips
            }
        }
        this.maxBet = secondHighest
        // this.players = this.players.filter(player => player.chips > 0);
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].allIn = null;
            this.players[i].moneyInPot = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].action = ''
            this.players[i].actionAmount = 0
            this.players[i].numericalHand = null;
            this.players[i].isWinner = false;
            this.players[i].actualHand = null;
        }
        //user newdealerindex to set the new dealer
        // this.dealer = newDealerIndex % this.players.length;
        this.turn = (this.dealer + 1) % this.players.length;
        while(true){
            if(this.players[this.turn].chips > 0){
                break
            }
            this.turn = (this.turn + 1) % this.players.length;
        }
        this.round = 0;
        this.pot = 0;
        if(this.players.length === 1){
            // this.active = false;
            this.turn = null
            return
        }
        this.currentBet = 0;
        this.foldedCount = 0;
        this.allInCount = 0;
        if(this.eliminatedCount === this.players.length - 1){
            return
        }  
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(this.bigBlind);
        this.betIndex = null;
        this.deck.dealPockets(this.players);

        for(let i = 0; i < this.players.length; i++){
            this.players[i].action = ''
        }
    }
    checktotals(){
        let moneyInPotSum = 0
        let chipsSum = 0
        for(let i = 0; i < this.players.length; i++){
            moneyInPotSum += this.players[i].moneyInPot
        }
        for(let i = 0; i < this.players.length; i++){
            chipsSum += this.players[i].chips
        }
        if(chipsSum + moneyInPotSum === this.totalChips && this.pot + chipsSum === this.totalChips){
            return true
        }return false

    }
    bet(amount){
        if(this.players[this.turn].bet + amount > this.currentBet){
            this.betIndex = this.turn;
            if(this.currentBet === 0){
                this.players[this.turn].action = 'bet'
                this.players[this.turn].actionAmount = amount + this.players[this.turn].bet      
            }else{
                this.players[this.turn].action = 'raise'
                this.players[this.turn].actionAmount = amount + this.players[this.turn].bet - 
                    this.currentBet
            }
        }else{
            if(this.currentBet === 0){
                this.players[this.turn].action = 'check'
                this.players[this.turn].actionAmount = 0 
            }else{
                this.players[this.turn].action = 'call'
                this.players[this.turn].actionAmount = amount
            }
        }
        if(this.betIndex === null){
            this.betIndex = this.turn;
        }

        this.currentBet = Math.max(amount + this.players[this.turn].bet, this.currentBet);

        this.pot += Math.min(amount, this.players[this.turn].chips);
        if(this.players[this.turn].chips <= amount){
            this.players[this.turn].allIn = this.players[this.turn].chips + this.players[this.turn].moneyInPot;
            this.players[this.turn].bet += this.players[this.turn].chips;
            this.players[this.turn].moneyInPot += this.players[this.turn].chips;
            this.allInCount += 1;
            this.players[this.turn].chips = 0;
            
            
        }else{
            this.players[this.turn].chips -= amount;
            this.players[this.turn].moneyInPot += amount;
            this.players[this.turn].bet += amount;
        }
        for(let i = 0; i < this.players.length; i++){
            //setting every players possible max win amount
            if(this.players[i].allIn !== null){
                let newMax = 0
                for(let j = 0; j < this.players.length; j++){
                    newMax += Math.min(this.players[j].moneyInPot, this.players[i].allIn);
                }
                this.players[i].maxWin = newMax;
            }
        }
        //flip cards
        if(this.foldedCount + this.allInCount === this.players.length){
            for(let i = 0; i < this.players.length; i++){
                //setting every players possible max win amount
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].moneyInPot, this.players[i].allIn);
                    }
                    this.players[i].maxWin = newMax;
                }
            }
            while(this.flop.length < 5){
                this.flop.push(this.deck.dealCard());
            }
            this.flipCards = true
            
        }
        this.nextTurn();    
    }
    fold(){
        this.players[this.turn].folded = true;
        this.players[this.turn].action = 'fold'
        this.players[this.turn].actionAmount = 0
        this.foldedCount += 1;
        this.nextTurn();
    }
    handleNumericalHands(){
        this.turn = null
        this.handComplete = true
        

        if(this.players.length === 1){
            this.players[0].chips += this.pot;
            this.pot = 0;
            this.turn = null
            return
        }
        let rankedHands = [];
        for(let i = 0; i < this.players.length; i++){
            this.handHandler.hand = [...this.players[i].pocket.concat(this.flop)];
            rankedHands.push(this.handHandler.findHand());

        }
        rankedHands = rankHands(rankedHands, this.players);
        this.players = rankedHands.players;
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].folded === true){
                this.players[i].numericalHand = null;
            }
            if(this.players[i].eliminated === true){
                this.players[i].numericalHand = null;
            }
        }
        let hands = this.players.map((player, index) => {
            return { index: index, numericalHand: player.numericalHand, allIn: player.allIn };
        });

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

        for(let i = 0; i < handledHands.length; i++){
            if(this.pot > 0){
                let splitDenom = handledHands[i].length;
                //determine max win amount. if they're not all in, it's the pot divided by the number of players with the same hand
                if(handledHands[i].length > 1){
                    //i was console loggin here before
                }
                for(let j = 0; j < handledHands[i].length; j++){
                    let maxWin = 0
                    if(handledHands[i][j].allIn === null){
                        maxWin = this.pot ;
                    }else{
                        maxWin = 0
                        for(let k = 0; k < this.players.length; k++){
                            maxWin += Math.min(this.players[k].moneyInPot, this.players[handledHands[i][j].index].allIn);
                        }
                    }
                    this.handWinnerInfo.push({player: this.players[handledHands[i][j].index], maxWin: maxWin})

                    this.players[handledHands[i][j].index].chips += Math.min(this.pot, Math.floor(maxWin / splitDenom));
                    //take this players share out of the pot
                    this.players[handledHands[i][j].index].moneyInPot = 0;
                    this.pot -= Math.min(this.pot, Math.floor(maxWin / splitDenom));
                    splitDenom --;
                    
                }
                
                // if(this.carryOver){
                //     this.pot += this.carryOver;
                //     this.carryOver = 0; 
                // }
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
            else{
                if(this.isTest){
                    this.nextHandNoShuffle();
                    return
                }
                if(this.isFrontEndTest){
                    this.nextHandNoShuffle();
                    return
                }
                // this.nextHand();
                return
            }
        }
        if(this.isTest){
            this.nextHandNoShuffle();
            return
        }
        if(this.isFrontEndTest){
            this.nextHandNoShuffle();
            return
        }
    }
    startGameNoShuffle(){

        for(let i = 0; i < this.players.length; i++){
            
        }
        
        this.active = true;
        for(let i = 0; i < this.players.length; i++){
            this.totalChips += this.buyIn;
            this.players[i].eliminated = false;
            this.players[i].chips = this.buyIn;
            this.players[i].allIn = null;
            this.players[i].bet = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].moneyInPot = 0;
            this.players[i].numericalHand = null;
        }
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(Math.floor(this.bigBlind));
        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }
    nextHandNoShuffle(){
        this.nextHandNoShuffleCallCount++
        //this accounts for if players BEFORE the dealer are getting eliminated or if the dealer is getting eliminated
        this.turn = (this.dealer + 1) % this.players.length;
        while(true){
            this.dealer = (this.dealer + 1) % this.players.length;
            if(this.players[this.dealer].chips > 0){
                break
            }
        }
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].chips === 0){
                this.players[i].pocket = []
                this.players[i].eliminated = true;
            }
        }
        // this.players = this.players.filter(player => player.chips > 0);
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].allIn = null;
            this.players[i].moneyInPot = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
        }
        //user newdealerindex to set the new dealer

        this.turn = (this.dealer + 1) % this.players.length;
        this.round = 0;
        this.pot = 0;
        if(this.players.length === 1){
            return
        }
        this.currentBet = 0;
        this.foldedCount = 0;
        this.allInCount = 0;
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(this.bigBlind);

        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }
}

