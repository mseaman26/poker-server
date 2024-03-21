import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a three of a kind and return it with the best two kicker cards", () => {
        let hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 13, suit: "diamonds" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.hasThreeOfAKind();
        expect(result).toEqual([
            { value: 13, suit: 'hearts' },
            { value: 13, suit: 'clubs' },
            { value: 13, suit: 'diamonds' },
            { value: 14, suit: 'spades' },
            { value: 9, suit: 'hearts' }
        ]);
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 7, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasThreeOfAKind();
        expect(result).toEqual(false);
        hand = [
            { value: 1, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 5, suit: "spades" },
            { value: 7, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 5, suit: "clubs" },
            { value: 5, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasThreeOfAKind();
        expect(result).toEqual([
            { value: 5, suit: "spades" },
            { value: 5, suit: "clubs" },
            { value: 5, suit: "diamonds" },
            { value: 13, suit: "hearts" },
            { value: 9, suit: "hearts" },
        ]);
    })
})