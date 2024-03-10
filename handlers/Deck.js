export class Deck{
    constructor(){
        this.deck = [];
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.createDeck();
    }
        createDeck(){
            for(let suit of this.suits){
                for(let value of this.values){
                    this.deck.push({value, suit});
                }
            }
        }
        shuffleDeck(){
            for(let i = this.deck.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
        }
        dealCard(){
            return this.deck.pop();
        }
}