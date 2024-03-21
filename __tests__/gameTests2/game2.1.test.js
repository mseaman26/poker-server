
import {Game} from '../../handlers/Game.js'
import { deck2_1, deck2_1_1 , deck2_1_2, deck2_1_3, deck2_1_4} from '../../handlers/fixedDecks.js'
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
        game.deck.deck = [...deck2_1]
        expect(game.deck.deck.length).toBe(52)
        
        game.startGameNoShuffle()
        
        expect(game.turn).toBe(1)
        expect(game.players[0].pocket).toEqual([{ value: 2, suit: 'diamonds' }, { value: 14, suit: 'spades' }])
        expect(game.players[1].pocket).toEqual([{ value: 4, suit: 'hearts' }, { value: 3, suit: 'diamonds' }])

        expect(game.flop.length).toBe(0)
        expect(game.players[1].pocket.length).toBe(2)
        expect(game.pot).toBe(150)
        //round 0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //0
        expect(game.round).toBe(1)

        //round 1
        expect(game.flop.length).toBe(3)
        expect(game.turn).toBe(1)
        game.bet(900) //1
        game.bet(900) //0
        expect(game.round).toBe(3)
        expect(game.players[0].numericalHand).toBe(1)
        expect(game.players[1].numericalHand).toBe(2)

        game.nextHandNoShuffle()
        players = [
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
        game = new Game(1, players, 0, 100, 1000)
        game.deck.deck = [...deck2_1]
        expect(game.deck.deck.length).toBe(52)
        game.startGameNoShuffle()
        expect(game.turn).toBe(3)
        expect(game.players[0].chips).toEqual(1000)
        expect(game.pot).toEqual(150)
        expect(game.players[1].chips).toEqual(950)
        //round 0
        game.bet(100) //3
        expect(game.betIndex).toBe(3)
        game.fold() //4
        expect(game.pot).toBe(250)
        game.fold() //0
        expect(game.turn).toBe(1)
        expect(game.flop).toEqual([])
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //2
        // expect(game.flop.length).toBe(3)
        expect(game.round).toBe(1)
        //round 1
        expect(game.turn).toBe(1)
        expect(game.flop.length).toBe(3)
        expect(game.pot).toBe(300)
        game.bet(0) //1
        game.bet(100) //2
        game.fold() //3
        expect(game.round).toBe(1)
        game.bet(100) //1
        //round 2
        expect(game.round).toBe(2)
        game.bet(0) //1
        game.bet(300) //2
        expect(game.round).toBe(2)
        game.bet(300) //1
        expect(game.round).toBe(3)
        //round 3
        expect(game.pot).toBe(1100)
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(3)
        expect(game.players[0].chips).toBe(1000)
        expect(game.players[1].chips).toBe(500)
        expect(game.players[2].chips).toBe(1600)
        expect(game.players[3].chips).toBe(900)
        expect(game.players[4].chips).toBe(1000)
        game.deck.deck = [...deck2_1_1]
        expect(game.deck.deck.length).toBe(52)
        game.nextHandNoShuffle()
        expect(game.round).toBe(0)
        expect(game.players[0].pocket).toEqual([{ value: 4, suit: 'clubs' }, { value: 3, suit: 'spades' }])
        //round 0
        expect(game.turn).toBe(4)
        game.fold() //4
        expect(game.betIndex).toBe(null)
        game.bet(100) //0
        game.fold() //1
        game.bet(50) //2
        expect(game.round).toBe(0)
        game.bet(0) //3
        expect(game.round).toBe(1)
        //round 1
        expect(game.flop.length).toBe(3)
        expect(game.turn).toBe(2)
        game.bet(0) //2
        game.bet(200) //3
        expect(game.turn).toBe(0)
        game.bet(200) //0
        expect(game.round).toBe(1)
        game.fold() //2
        //round 2 - 3
        expect(game.round).toBe(2)
        expect(game.turn).toBe(3)
        game.bet(200) //3
        expect(game.round).toBe(2)
        game.bet(200) //0
        expect(game.round).toBe(3)
        game.bet(0) //3
        game.bet(0) //0

        expect(game.players[0].chips).toBe(500)
        expect(game.players[1].chips).toBe(500)
        expect(game.players[2].chips).toBe(1500)
        expect(game.players[3].chips).toBe(1500)
        expect(game.players[4].chips).toBe(1000)
        game.deck.deck = deck2_1_2
        //nexthand
        expect(game.deck.deck.length).toBe(52)
        //next hand
        game.nextHandNoShuffle()
        expect(game.checktotals()).toBe(true)
        expect(game.players[0].pocket).toEqual([{ value: 7, suit: 'diamonds' }, { value: 11, suit: 'diamonds' }])
        expect(game.dealer).toBe(2)
        expect(game.turn).toBe(0)
        //round 0
        game.fold() //0
        game.fold() //1
        game.bet(100) //2
        game.bet(50) //3
        expect(game.round).toBe(0)
        game.bet(0) //4
        expect(game.round).toBe(1)
        expect(game.pot).toBe(300)
        //round 1
        expect(game.turn).toBe(3)
        game.bet(0) //3
        game.bet(100) //4
        game.bet(100) //2
        expect(game.round).toBe(1)
        game.fold() //3
          
        expect(game.round).toBe(2)
        expect(game.pot).toBe(500)
        //round 2
        expect(game.turn).toBe(4)
        game.bet(200) //4
        
        game.bet(200) //2
        expect(game.round).toBe(3)
        //round 3
        expect(game.pot).toBe(900)
        expect(game.turn).toBe(4)
        
        game.bet(600) //4
        expect(game.pot).toBe(1500)
        game.bet(600) //2
        

        expect(game.players[0].chips).toBe(500)
        expect(game.players[1].chips).toBe(500)
        expect(game.players[2].chips).toBe(500)
        expect(game.players[3].chips).toBe(1400)
        expect(game.players[4].chips).toBe(2100)

        //next hand
        
        game.deck.deck = deck2_1_3
        game.nextHandNoShuffle()
        expect(game.checktotals()).toBe(true)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(100) //2
        game.fold() //3
        game.fold() //4
        expect(game.players[4].moneyInPot).toBe(50)
        expect(game.round).toBe(0)
        game.bet(0) //0
        expect(game.round).toBe(1)
        expect(game.turn).toBe(0) 
        game.bet(400) //0  
        expect(game.players[0].allIn).toBe(500) 
        game.bet(400) //1
        expect(game.round).toBe(1)
        expect(game.pot).toBe(1150)
        game.bet(400) //2
        expect(game.round).toBe(3)

        expect(game.players[0].chips).toBe(775)
        expect(game.players[1].chips).toBe(775)
        expect(game.players[2].chips).toBe(0)
        expect(game.players[3].chips).toBe(1400)
        expect(game.players[4].chips).toBe(2050)
        // game = new Game(1, players, 0, 100, 1000)
        // game.deck.shuffleDeck()
        // console.log('deck: ', game.deck.deck)
        
        //next hand
        game.deck.deck = deck2_1_4
        expect(game.deck.deck.length).toBe(52)
        expect(game.players[0].chips).toBe(775)
        expect(game.players[1].chips).toBe(775)
        expect(game.players[3].chips).toBe(1400)
        expect(game.players[4].chips).toBe(2050)
        game.nextHandNoShuffle()
        expect(game.checktotals()).toBe(true)
        expect(game.players.length).toBe(4)   
        expect(game.dealer).toBe(3)
        expect(game.turn).toBe(2)
        expect(game.players[0].pocket).toEqual([{ value: 2, suit: 'clubs' }, { value: 2, suit: 'diamonds' }])
        game.bet(775) //2
        game.bet(775) //3
        game.bet(725) //0
        expect(game.round).toBe(0)
        game.bet(675) //1
        //round 1
        expect(game.round).toBe(1)
        expect(game.players[0].allIn).toBe(775)
        expect(game.players[1].allIn).toBe(775)
        expect(game.turn).toBe(2)
        game.bet(625) //2
        expect(game.players[3].moneyInPot).toBe(775)
        expect(game.players[2].chips).toBe(0)
        expect(game.pot).toBe(3725)
        game.bet(625) //3
        
        console.log('players: ', game.players)
        expect(game.round).toBe(3)
        console.log('game flop: ', game.flop)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(1550)
        expect(game.players[2].chips).toBe(2800)
        expect(game.players[3].chips).toBe(650)
        






    })
})
