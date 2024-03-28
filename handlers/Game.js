
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
    }
    
    startGame(){
        this.handComplete = false
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();

        for(let i = 0; i < this.players.length; i++){
            this.totalChips += this.buyIn;
        }
        
        this.active = true;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].chips = this.buyIn;
            this.players[i].allIn = null;
            this.players[i].bet = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].moneyInPot = 0;
            this.players[i].numericalHand = null;
        }
        this.setMaxBet();
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(Math.floor(this.bigBlind));
        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }

    nextTurn(){

        // let maxAllInBet = 0;
        // for(let i = 0; i < this.players.length; i++){
        //     if(this.players[i].allIn !== null){
        //         maxAllInBet = Math.max(maxAllInBet, this.players[i].bet);
        //     }
        // }
        // console.log('max all in bet: ', maxAllInBet)
        if(this.allInCount + this.foldedCount === this.players.length){
            this.nextRound()
            return
        }
        if(this.foldedCount === this.players.length - 1){
            //win by fold
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].bet, this.players[i].allIn);
                    }
                    this.players[i].maxWin = newMax;
                }
                if(this.players[i].folded === false){
                    //give money to winner by fold
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
            this.nextHand()
            // this.handleNumericalHands();
            return
        }
        if(this.allInCount + this.foldedCount === this.players.length -1 && this.currentBet === 0 && this.players.length > 1){
            //flip cards
            for(let i = 0; i < this.players.length; i++){
                if(this.players[i].allIn !== null){
                    let newMax = 0
                    for(let j = 0; j < this.players.length; j++){
                        newMax += Math.min(this.players[j].bet, this.players[i].allIn);
                    }
                    this.players[i].maxWin = newMax;
                }
            } 
            for(let i = 0; i < this.players.length; i++){
                this.players[i].moneyInPot = 0;
            }
            this.turn = null
            this.flipCards = true

            return
        }
        
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

        
    }
    setMaxBet(){
        // console.log('setting max bet')
        // // if(this.allInCount + this.foldedCount === this.players.length - 1){
        // //     console.log('calling nextRound within setMaxBet option 1')
        // //     this.nextRound()
        // //     // this.handleNumericalHands();
        // //     return
        // // }
        // if(this.foldedCount === this.players.length - 1){
        //     console.log('calling nextRound within setMaxBet option 2')
        //     this.nextRound()
        //     // this.handleNumericalHands();
        //     return
        // }
        // let secondHighest = 0;
        // let highest = 0;
        // for(let i = 0; i < this.players.length; i++){
        //     if(i===1){
        //     }
        //     if(this.players[i].folded === false){
        //         if(this.players[i].chips > highest){
        //             secondHighest = highest;
        //             highest = this.players[i].chips;
        //         }
        //         else if(this.players[i].chips > secondHighest){
        //             secondHighest = this.players[i].chips;
        //         }
        //     }
        // }
        // this.maxBet = secondHighest;
    }
    nextRound(){
        if(this.round === 0){
            this.flop = this.deck.dealFlop();
        }
        
        else if(this.round === 1){
            this.flop.push(this.deck.dealCard());
        }
        else if(this.round === 2){
            this.flop.push(this.deck.dealCard());
            //attaching the hand info to send to the front end
            for(let i = 0; i < this.players.length; i++){
                this.handHandler.hand = [...this.players[i].pocket.concat(this.flop)];
                this.players[i].actualHand = this.handHandler.findHand();
            }
        }
        else{
            this.handleNumericalHands();
            // if(this.isTest || this.isFrontEndTest){
            //     console.log('about to call nexthandnoshuffle in nextround line 141')
            //     this.nextHandNoShuffle();
            //     return
            // }
            // this.nextHand();
            return
        }
       
        this.round += 1;
        this.setMaxBet();
        this.currentBet = 0;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
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
                this.handHandler.hand = [...this.players[i].pocket.concat(this.flop)];
                this.players[i].actualHand = this.handHandler.findHand();
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
        this.nextHandCallCount++
        //this accounts for if players BEFORE the dealer are getting eliminated or if the dealer is getting eliminated
        this.deck.deck = []
        this.deck.createDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.deck.shuffleDeck();
        this.flop = [];
        let newDealerIndex = 0
        let currentIndex = 0
        while(currentIndex <= this.dealer){
            
            if(this.players[currentIndex].chips > 0){
                newDealerIndex++
            }
            currentIndex++
        }
        this.players = this.players.filter(player => player.chips > 0);
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].allIn = null;
            this.players[i].moneyInPot = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
        }
        //user newdealerindex to set the new dealer
        this.dealer = newDealerIndex % this.players.length;
        this.turn = (this.dealer + 1) % this.players.length;
        this.round = 0;
        this.pot = 0;
        if(this.players.length === 1){
            // this.active = false;
            return
        }
        this.currentBet = 0;
        this.foldedCount = 0;
        this.allInCount = 0;
        this.setMaxBet();
        console.log('turn inside NextHand before small blind: ', this.turn)    
        this.bet(Math.floor(this.bigBlind / 2));
        console.log('turn inside NextHand after small blind: ', this.turn)  
        this.bet(this.bigBlind);
        console.log('turn inside NextHand after big blind: ', this.turn)


        this.betIndex = null;
        this.deck.dealPockets(this.players);
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
        }
        if(this.betIndex === null){
            this.betIndex = this.turn;
        }
        // if((amount <= this.players[this.turn].chips)){
            this.currentBet = Math.max(amount + this.players[this.turn].bet, this.currentBet);
            // this.players[this.turn].allIn = amount + this.players[this.turn].bet;
        // }
        // else{
            
            // this.currentBet = Math.min(this.players[this.turn].chips, this.currentBet); 
            // this.currentBet = this.players[this.turn].chips + this.players[this.turn].bet; 
        // }
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
        this.nextTurn();    
    }
    fold(){
        this.players[this.turn].folded = true;
        this.foldedCount += 1;
        this.nextTurn();
    }
    // winHand(turn){
    //     this.players[turn].chips += this.pot;
    //     this.foldedCount = 0;
    //     this.nextHand();
    // }
    handleNumericalHands(){
        this.turn = null
        this.handComplete = true
        if(this.players.length === 1){
            this.players[0].chips += this.pot;
            this.pot = 0;
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
        
        //
        for(let i = 0; i < handledHands.length; i++){
            if(this.pot > 0){
                let splitDenom = handledHands[i].length;
                for(let j = 0; j < handledHands[i].length; j++){
                    //if current winner is not all in
                    if(this.players[handledHands[i][j].index].allIn === null){
                        if(handledHands[i].length === 1){
                            this.players[handledHands[i][j].index].chips += this.pot;
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
                            return
                        }else{
                            let denom = handledHands[i].length;
                            for(let k = 0; k < handledHands[i].length; k++){
                                this.players[handledHands[i][k].index].chips += Math.floor(this.pot / denom);
                                // handledHands[i][k].chips += Math.floor(this.pot / denom);
                                this.pot -= Math.floor(this.pot / denom);
                                denom--
                            }
                            if(this.isTest){
                                this.nextHandNoShuffle();
                                return
                            }
                            if(this.isFrontEndTest){
                                this.nextHandNoShuffle();
                                return
                            }
                            this.players[handledHands[i][j].index].chips += this.pot;
                            this.pot = 0;
                            // this.nextHand();
                            return
                            // let carryOver = this.pot % handledHands[i].length;
                            // this.players[handledHands[i][j].index].chips += splitPot;
                            // this.pot -= splitPot;
                            // if(this.pot - carryOver === 0){
                            //     this.carryOver = carryOver;
                            //     this.pot = 0;
                            //     // this.nextHand();
                            //     return
                            // }
                        }
                        
                    }else{
                    //if current winner is all in
                        let splitPot = 0
                        if(handledHands[i][j].index === 1){
                        }
                        for(let k = 0; k < this.players.length; k++){
                            //up up each players match bet to the all in amount
                            splitPot += Math.min(this.players[k].moneyInPot, this.players[handledHands[i][j].index].allIn);
                            if(handledHands[i][j].index === 1){
                            }

                        }
                        splitPot = Math.min(splitPot, this.pot);
                        let carryOver =  splitPot % handledHands[i].length;
                        this.players[handledHands[i][j].index].chips += Math.floor(splitPot/ splitDenom);
                        this.pot -= Math.floor(splitPot/ splitDenom);

                        if(this.pot - carryOver === 0){
                            this.carryOver = carryOver;
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
                            return
                        }
                        splitDenom--
                    }
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
        
    }
    startGameNoShuffle(){

        for(let i = 0; i < this.players.length; i++){
            this.totalChips += this.buyIn;
        }
        
        this.active = true;
        for(let i = 0; i < this.players.length; i++){
            this.players[i].chips = this.buyIn;
            this.players[i].allIn = null;
            this.players[i].bet = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
            this.players[i].moneyInPot = 0;
            this.players[i].numericalHand = null;
        }
        this.setMaxBet();
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(Math.floor(this.bigBlind));
        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }
    nextHandNoShuffle(){
        this.nextHandNoShuffleCallCount++
        //this accounts for if players BEFORE the dealer are getting eliminated or if the dealer is getting eliminated
        let newDealerIndex = 0
        let currentIndex = 0
        while(currentIndex <= this.dealer){
            if(this.players[currentIndex].chips > 0){
                newDealerIndex++
            }
            currentIndex++
        }
        for(let i = 0; i < this.players.length; i++){
            if(this.players[i].chips === 0){
                this.players[i].pocket = []
                this.players[i].eliminated = true;
            }
        }
        this.players = this.players.filter(player => player.chips > 0);
        for(let i = 0; i < this.players.length; i++){
            this.players[i].bet = 0;
            this.players[i].allIn = null;
            this.players[i].moneyInPot = 0;
            this.players[i].maxWin = null;
            this.players[i].folded = false;
        }
        //user newdealerindex to set the new dealer
        this.dealer = newDealerIndex % this.players.length;
        this.turn = (this.dealer + 1) % this.players.length;
        this.round = 0;
        this.pot = 0;
        if(this.players.length === 1){
            return
        }
        this.currentBet = 0;
        this.foldedCount = 0;
        this.allInCount = 0;
        this.setMaxBet();
        this.bet(Math.floor(this.bigBlind / 2));
        this.bet(this.bigBlind);

        this.betIndex = null;
        this.deck.dealPockets(this.players);
    }
}

