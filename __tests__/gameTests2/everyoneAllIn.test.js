import { Game } from "../../handlers/Game";

describe('everyone all in', () => {
    test('three players, everyone all in', () => {
        let players = [
            {
                id: 0,
                username: 'test0',
            },
            {
                id: 1,
                username: 'test1',
            },
            {
                id: 2,
                username: 'test2',
            }
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.deck.deck = [
            { value: 9, suit: 'clubs' },
            { value: 12, suit: 'spades' },
            { value: 9, suit: 'hearts' },
            { value: 5, suit: 'spades' },
            { value: 2, suit: 'clubs' },
            { value: 13, suit: 'diamonds' },
            { value: 7, suit: 'hearts' },
            { value: 3, suit: 'hearts' },
            { value: 13, suit: 'spades' },
            { value: 4, suit: 'spades' },
            { value: 14, suit: 'diamonds' },
            { value: 8, suit: 'clubs' },
            { value: 12, suit: 'diamonds' },
            { value: 3, suit: 'clubs' },
            { value: 14, suit: 'clubs' },
            { value: 13, suit: 'clubs' },
            { value: 2, suit: 'hearts' },
            { value: 6, suit: 'diamonds' },
            { value: 9, suit: 'diamonds' },
            { value: 14, suit: 'hearts' },
            { value: 11, suit: 'clubs' },
            { value: 8, suit: 'diamonds' },
            { value: 7, suit: 'spades' },
            { value: 8, suit: 'hearts' },
            { value: 6, suit: 'clubs' },
            { value: 4, suit: 'diamonds' },
            { value: 14, suit: 'spades' },
            { value: 8, suit: 'spades' },
            { value: 10, suit: 'spades' },
            { value: 4, suit: 'clubs' },
            { value: 11, suit: 'spades' },
            { value: 4, suit: 'hearts' },
            { value: 10, suit: 'hearts' },
            { value: 3, suit: 'spades' },
            { value: 7, suit: 'clubs' },
            { value: 11, suit: 'hearts' },
            { value: 9, suit: 'spades' },
            { value: 7, suit: 'diamonds' },
            { value: 5, suit: 'diamonds' },
            { value: 12, suit: 'hearts' },
            { value: 3, suit: 'diamonds' },
            //flop
            { value: 6, suit: 'spades' },
            { value: 2, suit: 'diamonds' },
            { value: 10, suit: 'clubs' },
            { value: 10, suit: 'diamonds' },
            { value: 2, suit: 'spades' },
            //p2
            { value: 5, suit: 'hearts' },
            { value: 5, suit: 'clubs' },
            //p1
            { value: 11, suit: 'diamonds' },
            { value: 6, suit: 'hearts' },
            //p0
            { value: 13, suit: 'hearts' },
            { value: 10, suit: 'clubs' }
        ]
        game.startGameNoShuffle();
        expect(game.round).toBe(0)
        expect(game.turn).toBe(0)
        game.bet(1000) //0
        game.bet(950) //1
        expect(game.round).toBe(0)
        game.bet(900) //2
        expect(game.round).toBe(1)
        expect(game.players[0].allIn).toBe(1000)
        expect(game.players[1].allIn).toBe(1000)
        expect(game.players[2].allIn).toBe(1000)
        game.nextFlip();
        expect(game.round).toBe(2)
        expect(game.flop.length).toBe(4)
        game.nextFlip();
        expect(game.round).toBe(3)
        expect(game.flop.length).toBe(5)
        game.nextFlip();
    })
})