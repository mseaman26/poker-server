import { rankHands } from "../../handlers/rankHands";
import { HandHandler } from "../../handlers/handHandler";

describe("handleHands", () => {
    test("should should properly rank an array of hands", () => {
        let hands = []
        const handHandler = new HandHandler();
        handHandler.hand = [
            { value: 6, suit: "clubs" },
            { value: 4, suit: "spades" },
            { value: 7, suit: "spades" },
            { value: 6, suit: "hearts" },
            { value: 5, suit: "clubs" },
            { value: 11, suit: "hearts" },
            { value: 3, suit: "hearts" },
        ]
        let enumeratedHand = handHandler.findHand();
    })
})