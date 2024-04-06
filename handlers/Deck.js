export class Deck{
    constructor(){
        this.deck = [];
        this.suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        this.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
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
        dealPockets(players){
            for(let i = 0; i < players.length; i++){
                if(players[i].eliminated === false){
                    players[i].pocket = [this.dealCard(), this.dealCard()];
                }
            }
        }
        dealFlop(){
            return [this.dealCard(), this.dealCard(), this.dealCard()];
        }
}