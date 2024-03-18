import { handHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect one or more straight flushes and return the highest one", () => {
        let hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        let currentHandHandler = new handHandler(hand);
        let result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(
            [
                { value: 9, suit: 'hearts' },
                { value: 10, suit: 'hearts' },
                { value: 11, suit: 'hearts' },
                { value: 12, suit: 'hearts' },
                { value: 13, suit: 'hearts' }
            ]
        );
        hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "hearts" },
            { value: 8, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(
            [
                { value: 10, suit: 'hearts' },
                { value: 11, suit: 'hearts' },
                { value: 12, suit: 'hearts' },
                { value: 13, suit: 'hearts' },
                { value: 14, suit: 'hearts' },
            ]
        );
        hand = [
            { value: 7, suit: "hearts" },
            { value: 4, suit: "hearts" },
            { value: 2, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 3, suit: "hearts" },
            { value: 14, suit: "hearts" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(
            [
                { value: 14, suit: "hearts" },
                { value: 2, suit: "hearts" },
                { value: 3, suit: 'hearts' },
                { value: 4, suit: 'hearts' },
                { value: 5, suit: 'hearts' },
            ]
        );
        hand = [
            { value: 6, suit: "hearts" },
            { value: 4, suit: "hearts" },
            { value: 2, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 3, suit: "hearts" },
            { value: 14, suit: "hearts" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(
            [
                { value: 2, suit: "hearts" },
                { value: 3, suit: 'hearts' },
                { value: 4, suit: 'hearts' },
                { value: 5, suit: 'hearts' },
                { value: 6, suit: "hearts" },
            ]
        );
        hand = [
            { value: 6, suit: "hearts" },
            { value: 4, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 3, suit: "hearts" },
            { value: 14, suit: "hearts" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(false);
        hand = [
            { value: 6, suit: "hearts" },
            { value: 4, suit: "hearts" },
            { value: 2, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 3, suit: "spades" },
            { value: 14, suit: "hearts" },
            { value: 5, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasStraightFlushes();
        expect(result).toEqual(false);
    })
})