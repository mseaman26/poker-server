import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a one pair hand and return it with the best kicker cards", () => {
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
        let result = currentHandHandler.hasOnePair();
        expect(result).toEqual([
            { value: 13, suit: "hearts" },
            { value: 13, suit: "clubs" },
            { value: 14, suit: "spades" },
            { value: 12, suit: "diamonds" },
            { value: 9, suit: "hearts" },
        ]);
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 12, suit: "diamonds" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasOnePair();
        expect(result).toEqual(false);
    })
})