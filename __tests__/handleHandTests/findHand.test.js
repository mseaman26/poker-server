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
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 14, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasRoyalFlush(),
            rank: [9],
            title: 'royal flush'
        });
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasStraightFlushes(),
            rank: [8, 13],
            title: 'straight flush'
        });
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 12, suit: "clubs" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasFlushes(),
            rank: [5, 13, 12, 10, 9, 5],
            title: 'flush'
        });
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 12, suit: "clubs" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasFlushes(),
            rank: [5, 13, 12, 10, 9, 5],
            title: 'flush'
        });

        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "spades" },
            { value: 5, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 12, suit: "hearts" },
            { value: 5, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        currentHandHandler.hand = hand;
        expect(result).toEqual({
            hand: currentHandHandler.hasFullHouse(),
            rank: [6, 12, 5],
            title: 'full house'
        });
        hand = [
            { value: 6, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 12, suit: "hearts" },
            { value: 5, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasThreeOfAKind(),
            rank: [3, 12, 13, 6],
            title: 'three of a kind'
        });
        hand = [
            { value: 9, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 2, suit: "hearts" },
            { value: 8, suit: "clubs" },
            { value: 6, suit: "hearts" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasStraights()[currentHandHandler.hasStraights().length - 1],
            rank: [4, 9],
            title: 'straight'
        });
        hand = [
            { value: 2, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 2, suit: "hearts" },
            { value: 2, suit: "clubs" },
            { value: 13, suit: "clubs" },
            { value: 2, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasFourOfAKind(),
            rank: [7, 2, 13],
            title: 'four of a kind'
        });
        hand = [
            { value: 10, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 2, suit: "hearts" },
            { value: 8, suit: "clubs" },
            { value: 6, suit: "spades" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.highCard(),
            rank: [0, 13, 10, 8, 7, 6],
            title: 'high card'
        });
        hand = [
            { value: 6, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 2, suit: "spades" },
            { value: 2, suit: "hearts" },
            { value: 8, suit: "clubs" },
            { value: 6, suit: "spades" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.findHand();
        expect(result).toEqual({
            hand: currentHandHandler.hasTwoPair(),
            rank: [2, 6, 2, 13],
            title: 'two pair'
        });
    })
})