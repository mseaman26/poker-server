import { handHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect a straight and rank it by how high it goes", () => {
        let hand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "diamonds" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "clubs" },
        ];
        let currentHandHandler = new handHandler(hand);
        let fiveCardHand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "clubs" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" }
        ];
        let result = currentHandHandler.FiveCardHandIsFlush(fiveCardHand);
        expect(result).toEqual(false);
        fiveCardHand = [
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 11, suit: "hearts" },
            { value: 10, suit: "hearts" },
            { value: 9, suit: "hearts" }
        ];
        result = currentHandHandler.FiveCardHandIsFlush(fiveCardHand);
        expect(result).toEqual(true);
        fiveCardHand = [
            { value: 13, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 11, suit: "clubs" },
            { value: 10, suit: "clubs" },
            { value: 9, suit: "clubs" }
        ];
        result = currentHandHandler.FiveCardHandIsFlush(fiveCardHand);
        expect(result).toEqual(true);
        fiveCardHand = [
            { value: 13, suit: "clubs" },
            { value: 12, suit: "clubs" },
            { value: 11, suit: "clubs" },
            { value: 10, suit: "clubs" },
            { value: 9, suit: "spades" }
        ];
        result = currentHandHandler.FiveCardHandIsFlush(fiveCardHand);
        expect(result).toEqual(false);
    })
})