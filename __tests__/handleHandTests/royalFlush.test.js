import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a royal flush and return it if there is one", () => {
        let hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.hasRoyalFlush();
        expect(result).toEqual(false);
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
        result = currentHandHandler.hasRoyalFlush();
        //i reversed the result because the function returns the cards in reverse order
        expect(result).toEqual([{"suit": "hearts", "value": 10}, {"suit": "hearts", "value": 11}, {"suit": "hearts", "value": 12}, {"suit": "hearts", "value": 13}, {"suit": "hearts", "value": 14}].reverse());
        hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 2, suit: "clubs" },
            { value: 14, suit: "hearts" },
            { value: 7, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasRoyalFlush();
        //i reversed the result because the function returns the cards in reverse order
        expect(result).toEqual([{"suit": "hearts", "value": 10}, {"suit": "hearts", "value": 11}, {"suit": "hearts", "value": 12}, {"suit": "hearts", "value": 13}, {"suit": "hearts", "value": 14}].reverse());

    })
})