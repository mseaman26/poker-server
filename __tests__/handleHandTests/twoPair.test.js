import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a two pair and should return it with the highest kicker or return false", () => {
        let hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 14, suit: "diamonds" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.hasTwoPair();
        expect(result).toEqual([
            { value: 14, suit: "spades" },
            { value: 14, suit: "diamonds" },
            { value: 13, suit: 'hearts' },
            { value: 13, suit: 'clubs' },
            { value: 9, suit: 'hearts' }
        ]);
    })
})