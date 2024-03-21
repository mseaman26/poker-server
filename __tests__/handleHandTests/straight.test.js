import { HandHandler } from "../../handlers/handHandler";

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
    let currentHandHandler = new HandHandler(hand);
    let result = currentHandHandler.hasStraights();
    expect(result).toEqual( [
        [
          { value: 8, suit: 'clubs' },
          { value: 9, suit: 'hearts' },
          { value: 10, suit: 'hearts' },
          { value: 11, suit: 'hearts' },
          { value: 12, suit: 'diamonds' }
        ],
        [
          { value: 9, suit: 'hearts' },
          { value: 10, suit: 'hearts' },
          { value: 11, suit: 'hearts' },
          { value: 12, suit: 'diamonds' },
          { value: 13, suit: 'hearts' }
        ],
        [
          { value: 10, suit: 'hearts' },
          { value: 11, suit: 'hearts' },
          { value: 12, suit: 'diamonds' },
          { value: 13, suit: 'hearts' },
          { value: 14, suit: 'spades' }
        ]
      ]);
    hand = [
        { value: 11, suit: "hearts" },
        { value: 12, suit: "diamonds" },
        { value: 8, suit: "hearts" },
        { value: 10, suit: "hearts" },
        { value: 9, suit: "hearts" },
        { value: 14, suit: "spades" },
        { value: 7, suit: "clubs" },
    ];
    currentHandHandler.hand = hand;
    result = currentHandHandler.hasStraights();
    expect(result).toEqual([
        [
          { value: 7, suit: 'clubs' },
          { value: 8, suit: 'hearts' },
          { value: 9, suit: 'hearts' },
          { value: 10, suit: 'hearts' },
          { value: 11, suit: 'hearts' }
        ],
        [
          { value: 8, suit: 'hearts' },
          { value: 9, suit: 'hearts' },
          { value: 10, suit: 'hearts' },
          { value: 11, suit: 'hearts' },
          { value: 12, suit: 'diamonds' }
        ]
    ]);
    hand = [
        { value: 11, suit: "hearts" },
        { value: 2, suit: "diamonds" },
        { value: 8, suit: "hearts" },
        { value: 3, suit: "hearts" },
        { value: 9, suit: "hearts" },
        { value: 14, suit: "spades" },
        { value: 7, suit: "clubs" },
    ];
    currentHandHandler.hand = hand;
    result = currentHandHandler.hasStraights();
    expect(result).toEqual([]);
    hand = [
      { value: 4, suit: "hearts" },
      { value: 2, suit: "diamonds" },
      { value: 8, suit: "hearts" },
      { value: 3, suit: "hearts" },
      { value: 9, suit: "hearts" },
      { value: 14, suit: "spades" },
      { value: 5, suit: "clubs" },
    ];
    currentHandHandler.hand = hand;
    result = currentHandHandler.hasStraights();
    expect(result).toEqual([[
      { value: 14, suit: 'spades' },
      { value: 2, suit: 'diamonds' },
      { value: 3, suit: 'hearts' },
      { value: 4, suit: 'hearts' },
      { value: 5, suit: 'clubs' }
    ]]);
    hand = [
      { value: 4, suit: "hearts" },
      { value: 2, suit: "diamonds" },
      { value: 6, suit: "hearts" },
      { value: 3, suit: "hearts" },
      { value: 7, suit: "hearts" },
      { value: 14, suit: "spades" },
      { value: 5, suit: "clubs" },
    ];
    currentHandHandler.hand = hand;
    result = currentHandHandler.hasStraights();
    expect(result).toEqual([
      [
        { value: 14, suit: 'spades' },
        { value: 2, suit: 'diamonds' },
        { value: 3, suit: 'hearts' },
        { value: 4, suit: 'hearts' },
        { value: 5, suit: 'clubs' }
      ],
      [
        { value: 2, suit: 'diamonds' },
        { value: 3, suit: 'hearts' },
        { value: 4, suit: 'hearts' },
        { value: 5, suit: 'clubs' },
        { value: 6, suit: "hearts" }
      ],
      [
        { value: 3, suit: 'hearts' },
        { value: 4, suit: 'hearts' },
        { value: 5, suit: 'clubs' },
        { value: 6, suit: "hearts" },
        { value: 7, suit: "hearts" }
      ]
    ]);
  })
})