import { handHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect four of a kind and return it with the best kicker", () => {
        let hand = [
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        let currentHandHandler = new handHandler(hand);
        let result = currentHandHandler.hasFourOfAKind();
        expect(result).toEqual([
            { value: 13, suit: 'clubs' },
            { value: 13, suit: 'hearts' },
            { value: 13, suit: 'spades' },
            { value: 13, suit: 'hearts' },
            { value: 14, suit: 'spades' }
        ]);
        hand = [
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFourOfAKind();
        expect(result).toEqual(false);
        hand = [
            { value: 3, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 3, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 3, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 3, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFourOfAKind();
        expect(result).toEqual([
            { value: 3, suit: "clubs" },
            { value: 3, suit: "spades" },
            { value: 3, suit: "hearts" },
            { value: 3, suit: "diamonds" },
            { value: 14, suit: "spades" }
        ]);
        hand = [
            { value: 2, suit: "clubs" },
            { value: 3, suit: "hearts" },
            { value: 2, suit: "spades" },
            { value: 3, suit: "clubs" },
            { value: 2, suit: "hearts" },
            { value: 4, suit: "spades" },
            { value: 2, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFourOfAKind();
        expect(result).toEqual([
            { value: 2, suit: "clubs" },
            { value: 2, suit: "spades" },
            { value: 2, suit: "hearts" },
            { value: 2, suit: "diamonds" },
            { value: 4, suit: "spades" }
        ]);
    })
})