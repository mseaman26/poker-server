
import {Game} from '../../handlers/Game.js'

describe('Game', () => {
    test('should return a new game', () => {
        const game = new Game()
        expect(game).toBeInstanceOf(Game)
    })

    test('should return a new game with a roomId', () => {
        const game = new Game(1)
        expect(game.roomId).toBe(1)
    })

    test('should return expected chip values after some betting', () => {
        const fixedDeck = [
            { value: 13, suit: 'hearts' },
            { value: 13, suit: 'diamonds' },
            { value: 12, suit: 'diamonds' },
            { value: 9, suit: 'hearts' },
            { value: 4, suit: 'clubs' },
            { value: 6, suit: 'spades' },
            { value: 9, suit: 'spades' },
            { value: 7, suit: 'hearts' },
            { value: 3, suit: 'diamonds' },
            { value: 14, suit: 'hearts' },
            { value: 6, suit: 'diamonds' },
            { value: 5, suit: 'diamonds' },
            { value: 10, suit: 'spades' },
            { value: 12, suit: 'spades' },
            { value: 5, suit: 'hearts' },
            { value: 12, suit: 'clubs' },
            { value: 10, suit: 'hearts' },
            { value: 14, suit: 'clubs' },
            { value: 4, suit: 'diamonds' },
            { value: 2, suit: 'spades' },
            { value: 11, suit: 'spades' },
            { value: 13, suit: 'clubs' },
            { value: 5, suit: 'spades' },
            { value: 2, suit: 'diamonds' },
            { value: 3, suit: 'spades' },
            { value: 11, suit: 'hearts' },
            { value: 14, suit: 'spades' },
            { value: 5, suit: 'clubs' },
            { value: 9, suit: 'clubs' },
            { value: 3, suit: 'hearts' },
            { value: 14, suit: 'diamonds' },
            { value: 12, suit: 'hearts' },
            { value: 4, suit: 'spades' },
            { value: 10, suit: 'diamonds' },
            { value: 8, suit: 'clubs' },
            { value: 10, suit: 'clubs' },
            { value: 13, suit: 'spades' },
            { value: 7, suit: 'diamonds' },
            { value: 2, suit: 'hearts' },
            { value: 9, suit: 'diamonds' },
            { value: 11, suit: 'clubs' },
            { value: 4, suit: 'hearts' },
            { value: 11, suit: 'diamonds' },
            { value: 6, suit: 'clubs' },
            { value: 8, suit: 'hearts' },
            { value: 3, suit: 'clubs' },
            { value: 8, suit: 'spades' },
            { value: 6, suit: 'hearts' },
            { value: 8, suit: 'diamonds' },
            { value: 7, suit: 'spades' },
            { value: 7, suit: 'clubs' },
            { value: 2, suit: 'clubs' }
          ]
        const players = [
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
            },
            {
                id: 3,
                username: 'test3',    
            },
            // {
            //     id: 4,
            //     username: 'test4',
            // },
            // {
            //     id: 5,
            //     username: 'test5',
            // },  
            // {
            //     id: 6,
            //     username: 'test6',
            // },
            // {
            //     id: 7,
            //     username: 'test7',
            // }
        ]
        const game = new Game(1, players, 0, 100, 10000)
        // game.deck.shuffleDeck()
        // game.deck.shuffleDeck()
        // game.deck.shuffleDeck()
        // console.log('!!',game.deck.deck)


        game.deck.deck = fixedDeck


        game.startGame()

        expect(game.players[0].pocket).toEqual([ { value: 2, suit: 'clubs' }, { value: 7, suit: 'clubs' } ])
        expect(game.players[1].pocket).toEqual([{ value: 7, suit: 'spades' }, { value: 8, suit: 'diamonds' }])
        // for(let i = 0; i < game.players.length; i++){
        //     console.log('!!',game.players[i].pocket, ', player ', i)
        // }
        expect(game.pot).toBe(150)
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(3)
        expect(game.currentBet).toBe(100)
        game.bet(100) //3
        game.bet(100) //0
        game.bet(50) //1
        expect(game.pot).toBe(400)
        expect(game.round).toBe(0)
        game.bet(0)//2
        expect(game.turn).toBe(1)
        //round 1 betting
        game.bet(0)//1
        game.bet(100)//2
        game.bet(100)//3
        game.bet(200)//0
        expect(game.betIndex).toBe(0)
        game.bet(200)//1
        game.bet(100)//2
        expect(game.round).toBe(1)
        game.bet(100)//3
        expect(game.round).toBe(2)
        //round 2
        expect(game.checktotals()).toBe(true)
        game.bet(0)//1
        game.bet(0)//2
        game.bet(0)//3
        expect(game.round).toBe(2)
        game.bet(0)//0
        expect(game.round).toBe(3)
        //round 3
        console.log('!!',game.flop)
        console.log(game) 
    })
})
