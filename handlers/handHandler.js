export class handHandler  {
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
        return this.hasStraights()[this.hasStraights().length - 1]

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
        return straightFlushes
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

    }
    hasFullHouse()  {

    }
    hasFlushes() {

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

    }
    hasTwoPair(){

    }
    hasOnePair() {

    }
    highCard() {

    }
}
