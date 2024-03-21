import { rankHands } from "../../handlers/rankHands";
import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should should properly rank an array of hands", () => {
        let hands = []
        const handHandler = new HandHandler();
        //player 0 one pair
        handHandler.hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 12, suit: "diamonds" },
        ]
        let enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 1 flush
        handHandler.hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 12, suit: "clubs" },
        ]
        enumeratedHand = handHandler.findHand();
        console.log('enumeratedHand',enumeratedHand)
        hands.push(enumeratedHand)
        //player 2 three of a kind
        handHandler.hand = [
            { value: 6, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 12, suit: "hearts" },
            { value: 5, suit: "diamonds" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 3 three of a kind, same as player 2
        handHandler.hand = [
            { value: 6, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 12, suit: "hearts" },
            { value: 5, suit: "diamonds" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 4 flush, slightly lower that player 1
        handHandler.hand = [
            { value: 4, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 12, suit: "clubs" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        
        //player 5 two pair
        handHandler.hand = [
                { value: 6, suit: "hearts" },
                { value: 13, suit: "hearts" },
                { value: 2, suit: "spades" },
                { value: 2, suit: "hearts" },
                { value: 8, suit: "clubs" },
                { value: 6, suit: "spades" },
                { value: 5, suit: "hearts" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 6 royal flush
        handHandler.hand = [
            { value: 10, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 2, suit: "spades" },
            { value:12, suit: "hearts" },
            { value: 8, suit: "clubs" },
            { value: 11, suit: "hearts" },
            { value: 14, suit: "hearts" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 7 straight flush
        handHandler.hand = [
            { value: 10, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 2, suit: "spades" },
            { value:12, suit: "hearts" },
            { value: 8, suit: "clubs" },
            { value: 11, suit: "hearts" },
            { value: 9, suit: "hearts" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        //player 8 one pair
        handHandler.hand = [
            { value: 10, suit: "clubs" },
            { value: 6, suit: "spades" },
            { value: 2, suit: "spades" },
            { value:12, suit: "hearts" },
            { value: 12, suit: "clubs" },
            { value: 11, suit: "hearts" },
            { value: 9, suit: "hearts" },
        ]
        enumeratedHand = handHandler.findHand();
        hands.push(enumeratedHand)
        let rankedHands = rankHands(hands);

        console.log('result',rankedHands)

        //TODO:
        //some usable hands down below that need to be converted into rankedHands, thats why i imported handHandler

            // //player 2 three of a kind
            // [
            //     { value: 6, suit: "hearts" },
            //     { value: 13, suit: "hearts" },
            //     { value: 12, suit: "spades" },
            //     { value: 2, suit: "clubs" },
            //     { value: 12, suit: "clubs" },
            //     { value: 12, suit: "hearts" },
            //     { value: 5, suit: "diamonds" },
            // ],
            // //player 3 straight flush
            // [
            //     { value: 5, suit: "hearts" },
            //     { value: 13, suit: "hearts" },
            //     { value: 7, suit: "spades" },
            //     { value: 9, suit: "hearts" },
            //     { value: 10, suit: "hearts" },
            //     { value: 12, suit: "hearts" },
            //     { value: 11, suit: "hearts" },
            // ],
            // [
            //     //player 4 four of a kind
            //     { value: 2, suit: "spades" },
            //     { value: 13, suit: "hearts" },
            //     { value: 7, suit: "spades" },
            //     { value: 2, suit: "hearts" },
            //     { value: 2, suit: "clubs" },
            //     { value: 13, suit: "clubs" },
            //     { value: 2, suit: "diamonds" },
            // ],
            // //player 5 two pair
            // [
            //     { value: 6, suit: "hearts" },
            //     { value: 13, suit: "hearts" },
            //     { value: 2, suit: "spades" },
            //     { value: 2, suit: "hearts" },
            //     { value: 8, suit: "clubs" },
            //     { value: 6, suit: "spades" },
            //     { value: 5, suit: "hearts" },
            // ]
        // ];
        // let result = rankHands(hands);
        // console.log('result',result)
        
    })
})