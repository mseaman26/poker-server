export class HandHandler  {
    constructor(hand) {
        this.hand = hand;
    }

    hasRoyalFlush()  {
        //if theres no straight return false
        if(this.hasStraights().length < 1){
            return false;
        }
        //if the highest straight doesn't start with a 10 return false
        if(this.hasStraights()[this.hasStraights().length - 1][0].value !== 10){
            return false;
        }
        //if the straight starts with 10 but isn't a flush return false
        if(!this.FiveCardHandIsFlush(this.hasStraights()[this.hasStraights().length - 1])){
            return false;
        }
        //if all the above conditions are met return the highest straight, which is a royal flush
        return this.hasStraights()[this.hasStraights().length - 1].reverse()

    }
    hasStraightFlushes() {
        //if there are no straights return false
        if(this.hasStraights().length < 1){
            return false;
        }
        let straightFlushes = []
        //for each straight check if it's a flush
        for(let i = 0; i < this.hasStraights().length; i++){
            if(this.FiveCardHandIsFlush(this.hasStraights()[i])){
                straightFlushes.push(this.hasStraights()[i])
            }
        }
        //if there are no straight flushes return false
        if(straightFlushes.length < 1){
            return false;
        }
        //if there are straight flushes return them
        return straightFlushes[straightFlushes.length - 1]
    }
    FiveCardHandIsFlush(fiveCardHand) {
        let suits = fiveCardHand.map(card => card.suit);
        let uniqueSuits = new Set(suits);
        if(uniqueSuits.size === 1){
            return true;
        }
        return false;
    }
    hasFourOfAKind() {
        let obj = {}
        for(let i = 0; i < this.hand.length; i++){
            if(obj[this.hand[i].value]){
                obj[this.hand[i].value]++
            } else {
                obj[this.hand[i].value] = 1
            }
        }
        if(!Object.values(obj).includes(4)){
            return false
        }
        //get the value of the card that has 4 of a kind
        let fiveCardHand = []
        let value = parseInt(Object.keys(obj).find(key => obj[key] === 4));
        let kickerValue = 0
        let kicker
        
        for(let i = 0; i < this.hand.length; i++){
            if(this.hand[i].value !== value){
                if(this.hand[i].value > kickerValue){
                    kickerValue = this.hand[i].value
                    kicker = this.hand[i]
                }
            }
        }
        for(let i = 0; i < this.hand.length; i++){
            if(this.hand[i].value == value){
                fiveCardHand.push(this.hand[i])
            }
        }
        fiveCardHand.push(kicker)
        return fiveCardHand
        


    }
    hasFullHouse()  {
        let handToSort = this.hand.map(card => card)
        let sortedHand = handToSort.sort((a, b) =>b.value - a.value);
        let finalHand = []
        let hasThreeOfAKind = false
        let hasPair = false
        for(let i = 0; i < sortedHand.length - 2; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value && sortedHand[i].value === sortedHand[i + 2].value){
                //remove the three of a kind from the hand and add it to the final hand
                finalHand.push(...sortedHand.splice(i, 3))
                hasThreeOfAKind = true
                break;
            }
        }
        if(!hasThreeOfAKind){
            return false
        }
        for(let i = 0; i < sortedHand.length - 1; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value){
                //remove the pair from the hand and add it to the final hand
                finalHand.push(...sortedHand.splice(i, 2))
                hasPair = true
                break;
            }
        }
        if(!hasPair){
            return false
        }
        return finalHand
    }
    hasFlushes() {
        let obj = {}
        let flushSuit = ""
        for(let i = 0; i < this.hand.length; i++){
            if(obj[this.hand[i].suit]){
                if(obj[this.hand[i].suit] >= 4){
                    flushSuit = this.hand[i].suit
                    break
                }
                obj[this.hand[i].suit]++
            } else {
                obj[this.hand[i].suit] = 1
            }
        }
        if(flushSuit === ""){
            return false
        }
        let sortedSuitCards = this.hand.filter(card => card.suit === flushSuit).sort((a, b) => b.value - a.value)
        return sortedSuitCards.slice(0, 5)
        
    }
    hasStraights() {
        let sortedHand = this.hand.sort((a, b) => a.value - b.value);
        let straights = []
        let cardValues = sortedHand.map(card => card.value)
        if(cardValues.includes(14) && cardValues.includes(2) && cardValues.includes(3) && cardValues.includes(4) && cardValues.includes(5)){
            straights.push([sortedHand[6], sortedHand[0], sortedHand[1], sortedHand[2], sortedHand[3]])
        }
        for(let i = 0; i < sortedHand.length - 4; i++){
            let currentIndex = i
            let currentStraight = []
            currentStraight.push(sortedHand[currentIndex])
            while(sortedHand[currentIndex].value + 1 === sortedHand[currentIndex + 1].value){
                currentStraight.push(sortedHand[currentIndex + 1])
                currentIndex++
                if(currentIndex >= i + 4){
                    break;
                }
            }
            
            if(currentStraight.length >= 5){
                straights.push(currentStraight)
            }
        }
        return straights
    }
    hasThreeOfAKind() {
        let handToSort = this.hand.map(card => card)
        let sortedHand = handToSort.sort((a, b) =>b.value - a.value);
        let finalHand = []
        let hasThreeOfAKind = false
        for(let i = 0; i < sortedHand.length - 2; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value && sortedHand[i].value === sortedHand[i + 2].value){
                //remove the three of a kind from the hand and add it to the final hand
                finalHand.push(...sortedHand.splice(i, 3))
                hasThreeOfAKind = true
                break;
            }
        }
        if(!hasThreeOfAKind){
            return false
        }
        finalHand.push(sortedHand[0])
        finalHand.push(sortedHand[1])
        return finalHand
    }
    hasTwoPair(){
        let handToSort = this.hand.map(card => card)
        let sortedHand = handToSort.sort((a, b) =>b.value - a.value);
        let finalHand = []
        for(let i = 0; i < sortedHand.length - 1; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value){
                finalHand.push(...sortedHand.splice(i, 2))
                break
            }
        }
        for(let i = 0; i < sortedHand.length - 1; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value){
                finalHand.push(...sortedHand.splice(i, 2))
                break
            }
        }
        if(finalHand.length < 4){
            return false
        }
        finalHand.push(sortedHand[0])
        
        return finalHand
    }
    hasOnePair() {
        let handToSort = this.hand.map(card => card)
        let sortedHand = handToSort.sort((a, b) =>b.value - a.value);
        let finalHand = []
        for(let i = 0; i < sortedHand.length - 1; i++){
            if(sortedHand[i].value === sortedHand[i + 1].value){
                finalHand.push(...sortedHand.splice(i, 2))
                break
            }
        }
        if(finalHand.length < 2){
            return false
        }
        finalHand.push(sortedHand[0])
        finalHand.push(sortedHand[1])
        finalHand.push(sortedHand[2])
        return finalHand
    }
    highCard() {
        let sortedHand = this.hand.sort((a, b) =>b.value - a.value);
        return sortedHand.slice(0, 5)
    }
    //converting hands to rankable objects
    findHand() {
        // let startingHand = this.hand.map(card => card)
        if(this.hasRoyalFlush()){
            const actualHand = this.hasRoyalFlush()
            const rankedHand = {
                hand: actualHand,
                rank: [9],
                title: 'royal flush'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasStraightFlushes()){
            const actualHand = this.hasStraightFlushes()
            const rankedHand = {
                hand: actualHand,
                rank: [8, actualHand[4].value],
                title: 'straight flush'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasFourOfAKind()){
            // this.hand = startingHand.map(card => card)
            const actualHand = this.hasFourOfAKind()
            const rankedHand = {
                hand: actualHand,
                rank: [7, actualHand[0].value,  actualHand[4].value],
                title: 'four of a kind'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasFullHouse()){
            // this.hand = startingHand.map(card => card)
            const actualHand = this.hasFullHouse()
            const rankedHand = {
                hand: actualHand,
                rank: [6, actualHand[0].value, actualHand[4].value],
                title: 'full house'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasFlushes()){
            const actualHand = this.hasFlushes()
            const rankedHand = {
                hand: actualHand,
                rank: [5, actualHand[0].value, actualHand[1].value, actualHand[2].value, actualHand[3].value, actualHand[4].value],
                title: 'flush'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasStraights().length > 0){
            const actualHand = this.hasStraights()[this.hasStraights().length - 1]
            const rankedHand = {
                hand: actualHand,
                rank: [4, actualHand[4].value],
                title: 'straight'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasThreeOfAKind()){
            const actualHand = this.hasThreeOfAKind()
            const rankedHand = {
                hand: actualHand,
                rank: [3, actualHand[0].value, actualHand[3].value, actualHand[4].value],
                title: 'three of a kind'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasTwoPair()){
            const actualHand = this.hasTwoPair()
            const rankedHand = {
                hand: actualHand,
                rank: [2, actualHand[0].value, actualHand[2].value, actualHand[4].value],
                title: 'two pair'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        if(this.hasOnePair()){
            const actualHand = this.hasOnePair()
            const rankedHand = {
                hand: actualHand,
                rank: [1, actualHand[0].value, actualHand[2].value, actualHand[3].value, actualHand[4].value],
                title: 'one pair'
            }
            return rankedHand
        }
        // this.hand = startingHand.map(card => card)
        return {
            hand: this.highCard(),
            rank: [0, this.highCard()[0].value, this.highCard()[1].value, this.highCard()[2].value, this.highCard()[3].value, this.highCard()[4].value],
            title: 'high card'
        }
    }
    
}
