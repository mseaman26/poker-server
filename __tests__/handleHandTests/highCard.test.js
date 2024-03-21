import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect high card and return it with kickers", () => {
        let hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 11, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 12, suit: "diamonds" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.highCard();
        expect(result).toEqual([
            { value: 14, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "diamonds" },
            { value: 11, suit: "clubs" },
            { value: 9, suit: "hearts" },
        ]);
    })
})