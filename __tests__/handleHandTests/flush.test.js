import { handHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should detect any flushes and return the best one", () => {
        let hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 12, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 14, suit: "spades" },
            { value: 8, suit: "hearts" },
        ];
        let currentHandHandler = new handHandler(hand);
        let result = currentHandHandler.hasFlushes();
        console.log(result)
        expect(result).toEqual([
            { value: 13, suit: 'hearts' },
            { value: 12, suit: 'hearts' },
            { value: 9, suit: 'hearts' },
            { value: 8, suit: 'hearts' },
            { value: 5, suit: 'hearts' }
        ]);
        hand = [
            { value: 5, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 8, suit: "hearts" },
            { value: 7, suit: "spades" },
            { value: 13, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 12, suit: "hearts" },
            
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFlushes();
        console.log(result)
        expect(result).toEqual([
            { value: 13, suit: "hearts" },
            { value: 13, suit: "hearts" },
            { value: 12, suit: "hearts" },
            { value: 9, suit: "hearts" },
            { value: 8, suit: 'hearts' },
        ]);
        hand = [
            { value: 6, suit: "clubs" },
            { value: 5, suit: "clubs" },
            { value: 2, suit: "clubs" },
            { value: 14, suit: "clubs" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "clubs" },
            { value: 7, suit: "clubs" },  
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFlushes();
        console.log(result)
        expect(result).toEqual([
            { value: 14, suit: "clubs" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "clubs" },
            { value: 7, suit: "clubs" },
            { value: 6, suit: 'clubs' },
        ]);
        hand = [
            { value: 6, suit: "clubs" },
            { value: 5, suit: "spades" },
            { value: 2, suit: "clubs" },
            { value: 14, suit: "diamons" },
            { value: 13, suit: "clubs" },
            { value: 9, suit: "hearts" },
            { value: 7, suit: "clubs" },  
        ];
        currentHandHandler.hand = hand;
        result = currentHandHandler.hasFlushes();
        console.log(result)
        expect(result).toEqual(false);
    })
})