
import {Game} from '../../handlers/Game'
describe('win by fold', () => {
   test('two players, one all in, one folds', () => {
        let players = [
            {
            id: 0,
            username: 'test0',    
            },
            {
            id: 1,
            username: 'test1',    
            },
        ]
        let game = new Game(1, players, 0, 100, 1000)
        // game.isTest = true
        game.startGame()
        expect(game.turn).toBe(1)
        game.bet(50)
        expect(game.round).toBe(0)
        game.bet(0)
        expect(game.round).toBe(1)
        game.bet(500) //1
        expect(game.round).toBe(1)
        game.bet(500) // 0
        expect(game.round).toBe(2)
        expect(game.players[0].chips).toBe(400)
        expect(game.players[1].chips).toBe(400)
        game.bet(100) //1
        game.fold() //0
        //hand 2
        game.nextHand()
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(350)
        expect(game.players[1].chips).toBe(1500)
        game.bet(50) // 0
        expect(game.round).toBe(0)
        game.bet(0)    // 1
        expect(game.round).toBe(1)
        expect(game.turn).toBe(0)
        game.bet(100) // 0
        game.bet(100) // 1
        expect(game.round).toBe(2)
        expect(game.pot).toBe(400)
        expect(game.players[0].chips).toBe(200)
        expect(game.turn).toBe(0)
        game.bet(200) // 0
        game.fold() // 1
        game.nextHand()
        expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(500)
    })
    test('three players, two all in, one folds', () => {
        const fixedDeck = [
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
            //flop
            { value: 4, suit: 'hearts' },
            { value: 10, suit: 'hearts' },
            { value: 3, suit: 'spades' },
            { value: 7, suit: 'clubs' },
            { value: 11, suit: 'hearts' },
            //p2
            { value: 3, suit: 'clubs' },
            { value: 7, suit: 'diamonds' },
            //p1
            { value: 5, suit: 'diamonds' },
            { value: 12, suit: 'hearts' },
            //p0
            { value: 3, suit: 'diamonds' },
            { value: 7, suit: 'spades' },
            //
            { value: 2, suit: 'diamonds' },
            { value: 10, suit: 'clubs' },
            { value: 10, suit: 'diamonds' },
            { value: 2, suit: 'spades' },
            { value: 5, suit: 'hearts' },
            { value: 5, suit: 'clubs' },
            { value: 11, suit: 'diamonds' },
            { value: 6, suit: 'hearts' },
            { value: 13, suit: 'hearts' },
            { value: 10, suit: 'clubs' }
        ]
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
            username: 'test3',    
            },
        ]
        //game 2
        let game = new Game(1, players, 0, 100, 1000)
        game.isTest = true
        game.deck.deck = [...fixedDeck]
        expect(game.deck.deck.length).toEqual(52)
        game.startGameNoShuffle()
        expect(game.turn).toBe(0)
        game.bet(100) //0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(500) //1
        game.bet(500) // 2
        expect(game.round).toBe(1)
        game.bet(500) // 0
        expect(game.round).toBe(2)
        game.bet(100) //1
        game.fold() //2
        game.fold() //
        //game 2 hand 2
        game.nextHand()
        expect(game.round).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.players[0].chips).toBe(300)
        expect(game.players[1].chips).toBe(2200)
        expect(game.players[2].chips).toBe(350)
        game.bet(100) // 1
        game.bet(50) // 2
        expect(game.round).toBe(0)
        game.bet(0) // 0
        expect(game.round).toBe(1)
        expect(game.turn).toBe(2)
        game.bet(300) // 2
        expect(game.players[2].allIn).toBe(400)
        expect(game.turn).toBe(0)
        game.bet(300) // 0
        game.fold() //1
        expect(game.round).toBe(2)
        
        game.nextFlip()
        expect(game.round).toBe(3)
        game.nextFlip()
        
        game.nextHand()
       
        


    })
})