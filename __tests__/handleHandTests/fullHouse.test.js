import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect one or more straight full houses and return the highest one", () => {
        let hand = [
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        let currentHandHandler = new HandHandler(hand);
        let result = currentHandHandler.hasFullHouse();
        expect(result).toEqual(false);     
        hand = [
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 9, suit: "spades" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFullHouse();
        expect(result).toEqual([
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 9, suit: "spades" }
        ]);  
        hand = [
            { value: 9, suit: "hearts" },
            { value: 9, suit: "spades" },
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFullHouse();
        expect(result).toEqual([
            { value: 13, suit: "clubs" },
            { value: 13, suit: "hearts" },
            { value: 13, suit: "spades" },
            { value: 9, suit: "hearts" },
            { value: 9, suit: "spades" },
        ]);  
        hand = [
            { value: 2, suit: "hearts" },
            { value: 9, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 8, suit: "clubs" },
            { value: 8, suit: "spades" },
            { value: 2, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFullHouse();
        expect(result).toEqual([
            { value: 8, suit: "clubs" },
            { value: 8, suit: "spades" },
            { value: 8, suit: "hearts" },
            { value: 2, suit: "hearts" },
            { value: 2, suit: "clubs" },
        ]);
    })
})