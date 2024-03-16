import { handHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a straight and rank it by how high it goes", () => {
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
        expect(result).toEqual([{"suit": "hearts", "value": 10}, {"suit": "hearts", "value": 11}, {"suit": "hearts", "value": 12}, {"suit": "hearts", "value": 13}, {"suit": "hearts", "value": 14}]);
        hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 2, suit: "clubs" },
            { value: 14, suit: "hearts" },
            { value: 7, suit: "hearts" },
        ];
        currentHandHandler = new handHandler(hand);
        result = currentHandHandler.hasRoyalFlush();
        expect(result).toEqual([{"suit": "hearts", "value": 10}, {"suit": "hearts", "value": 11}, {"suit": "hearts", "value": 12}, {"suit": "hearts", "value": 13}, {"suit": "hearts", "value": 14}]);

    })
})