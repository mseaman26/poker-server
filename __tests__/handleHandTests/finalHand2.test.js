import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should return the best possible 5 card hand", () => {
        let hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 12, suit: "diamonds" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasOnePair(),
            rank: [1, 13, 14, 12, 9],
            title: 'one pair'
        });
        hand = [
            { value: 5, suit: "diamonds" },
            { value: 6, suit: "clubs" },
            { value: 7, suit: "spades" },
            { value: 8, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 10, suit: "clubs" },
            { value: 10, suit: "diamons" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasThreeOfAKind(),
            rank: [3, 10, 8, 7],
            title: 'three of a kind'
        });
        hand = [
            { value: 5, suit: "clubs" },
            { value: 6, suit: "clubs" },
            { value: 7, suit: "clubs" },
            { value: 8, suit: "clubs" },
            { value: 2, suit: "hearts" },
            { value: 10, suit: "clubs" },
            { value: 11, suit: "diamons" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasFlushes(),
            rank: [5, 10, 8, 7, 6, 5], 
            title: 'flush'
        });
        hand = [
            { value: 5, suit: "clubs" },
            { value: 8, suit: "spades" },
            { value: 7, suit: "clubs" },
            { value: 3, suit: "clubs" },
            { value: 2, suit: "hearts" },
            { value: 10, suit: "clubs" },
            { value: 4, suit: "diamons" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.highCard(),
            rank: [0, 10, 8, 7, 5, 4], 
            title: 'high card'
        });
        hand = [
            { value: 5, suit: "clubs" },
            { value: 8, suit: "spades" },
            { value: 6, suit: "clubs" },
            { value: 3, suit: "clubs" },
            { value: 2, suit: "clubs" },
            { value: 10, suit: "spades" },
            { value: 4, suit: "clubs" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasStraightFlushes(),
            rank: [8, 6], 
            title: 'straight flush'
        });
    })
})