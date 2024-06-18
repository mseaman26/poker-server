
import e from 'cors'
import {Game} from '../../handlers/Game.js'
import { deck2_1, deck2_1_1 , deck2_1_2, deck2_1_3, deck2_1_4, deck2_1_5, deck2_1_6, deck2_1_7, deck2_1_8, deck2_1_9} from '../../handlers/fixedDecks.js'
describe('Game', () => {


    test('should return expected chip values after some betting', () => {
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
            },
            {
                id: 3,
                username: 'test3',    
            },
            {
                id: 4,
                username: 'test4',
            }
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.deck.deck = [...deck2_1]

        expect(game.deck.deck.length).toBe(52)
        game.isTest = true
        game.startGame()
        expect(game.deck.deck[0]).toEqual({ value: 7, suit: 'diamonds' })
        expect(game.deck.deck.length).toBe(42)
        expect(game.players[0].chips).toBe(1000)
        expect(game.players[1].chips).toBe(950)
        expect(game.players[2].chips).toBe(900)
        expect(game.players[3].chips).toBe(1000)
        expect(game.players[4].chips).toBe(1000)
        expect(game.pot).toBe(150)
        game.bet(100) //3
        game.fold() //4
        game.fold() //0
        game.fold() //1
        game.bet(0) //2
        expect(game.round).toBe(1) //round 1  0, 1, and 4 folded
        expect(game.pot).toBe(250)
        expect(game.turn).toBe(2)
        expect(game.players[2].chips).toBe(900)
        expect(game.players[3].chips).toBe(900)
        game.bet(900) //2
        expect(game.players[2].allIn).toBe(1000)
        game.bet(900) //3
        expect(game.flipCards).toBe(true)
        expect(game.round).toBe(2) //round 2
        game.nextFlip()
        expect(game.round).toBe(3) 
        game.nextFlip()
        //NEXT HAND
        game.deck.deck = [...deck2_1]
        game.nextHand()
        expect(game.deck.deck.length).toBe(44)
        expect(game.dealer).toBe(1)
        expect(game.round).toBe(0)
        expect(game.players[2].chips).toBe(2000)
        expect(game.players[4].chips).toBe(900)
        game.bet(100) //0
        game.bet(100) //1
        game.bet(50) //2
        expect(game.round).toBe(0)
        game.bet(0) //
        expect(game.round).toBe(1)  
        expect(game.turn).toBe(2)
        game.bet(100) //2
        expect(game.eliminatedCount).toBe(1)
        expect(game.buyBacks).toEqual([])
        //Player 3 buys back in
        game.buyBack(3, 1000)
        expect(game.buyBacks.length).toBe(1)
        expect(game.buyBacks[0]).toEqual({playerIndex: 3, amount: 1000})
        expect(game.eliminatedCount).toBe(1)
        game.bet(100) //4
        game.bet(100) //0
        expect(game.round).toBe(1)
        game.bet(100) //1
        expect(game.round).toBe(2) //Round 2
        expect(game.buyBacks.length).toBe(1)
        expect(game.buyBacks[0]).toEqual({playerIndex: 3, amount: 1000})
        expect(game.eliminatedCount).toBe(1)
        game.bet(0) //2
        game.bet(0) //4
        game.bet(0) //0
        expect(game.round).toBe(2)
        game.bet(0) //1
        expect(game.round).toBe(3)
        game.bet(0) //2
        game.bet(0) //4
        game.bet(0) //0
        game.bet(0) //1
        expect(game.round).toBe(3)
        //NEXT HAND
        game.deck.deck = [...deck2_1]
        game.nextHand()
        console.log('gamesies: ', game.players)
        expect(game.deck.deck.length).toBe(42)
        expect(game.totalChips).toBe(6000)
        expect(game.eliminatedCount).toBe(0)
        expect(game.buyBacks.length).toBe(0)
        expect(game.checktotals()).toBe(true)
        expect(game.dealer).toBe(2)
        expect(game.turn).toBe(0)
        game.bet(800) //0
        game.bet(750) //1
        expect(game.players[0].allIn).toBe(800)
        expect(game.players[1].allIn).toBe(750)
        expect(game.pot).toBe(1700)
        game.fold() //2
        game.fold() //3
        expect(game.round).toBe(0)
        game.bet(700) //4
        expect(game.players[4].allIn).toBe(800)
        expect(game.round).toBe(1)
        expect(game.flipCards).toBe(true)
        game.nextFlip()
        expect(game.round).toBe(2)
        game.nextFlip()
        expect(game.round).toBe(3)
        game.nextFlip()
        //NEXT HAND
        game.deck.deck = [...deck2_1]
        game.nextHand()
        expect(game.checktotals()).toBe(true)
        expect(game.deck.deck.length).toBe(44)
        expect(game.players[0].bet).toBe(50)
        expect(game.players[1].bet).toBe(100)
        expect(game.dealer).toBe(3)
        expect(game.turn).toBe(2)
        game.bet(100) //2
        game.bet(100) //3
        game.bet(50) //0
        expect(game.round).toBe(0)
        game.bet(0) //1
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(1)
        game.bet(0) //3
        expect(game.round).toBe(2)
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(2)
        game.bet(0) //3
        expect(game.round).toBe(3)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        expect(game.handComplete).toBe(true)
        //NEXT HAND
        game.deck.deck = [...deck2_1]
        game.nextHand()
        expect(game.checktotals()).toBe(true)
        expect(game.eliminatedCount).toBe(2)
        expect(game.players[0].eliminated).toBe(true)
        expect(game.players[4].eliminated).toBe(true)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(50) //2
        expect(game.round).toBe(0)
        game.bet(0) //3
        expect(game.round).toBe(1)
        //Players 0 and 4 buy back in
        game.buyBack(0, 1000)
        game.buyBack(4, 1000)
        expect(game.buyBacks.length).toBe(2)
        expect(game.buyBacks[0]).toEqual({playerIndex: 0, amount: 1000})
        expect(game.buyBacks[1]).toEqual({playerIndex: 4, amount: 1000})
        expect(game.eliminatedCount).toBe(2)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        expect(game.round).toBe(2)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        expect(game.round).toBe(3)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        expect(game.handComplete).toBe(true)
        //NEXT HAND
        game.deck.deck = [...deck2_1]
        game.nextHand()
        expect(game.checktotals()).toBe(true)
        expect(game.eliminatedCount).toBe(0)
        expect(game.buyBacks.length).toBe(0)
        expect(game.totalChips).toBe(8000)
    })
})
 