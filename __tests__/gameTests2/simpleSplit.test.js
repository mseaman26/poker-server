
import { Game } from "../../handlers/Game"
const fixedDeck = [
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
    {value: 2, suit: 'hearts'},
]


describe('everyone has copies of the same card for all their cards', () => {
    test('everyone has copies of the same card for all their cards', () => {
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
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.deck.deck = [...fixedDeck]
        game.startGame()
        expect(game.turn).toBe(0)
        game.bet(100)//0
        game.bet(50)//1
        expect(game.round).toBe(0)
        game.bet(0)//2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(900) //1
        expect(game.players[1].allIn).toBe(1000)  
        game.bet(900) //2
        game.bet(900) //0
        expect(game.round).toBe(2)
        game.nextFlip()
        expect(game.round).toBe(3)
        game.nextFlip()
        expect(game.players[0].chips).toBe(1000)
        expect(game.players[0].chips).toBe(1000)
        expect(game.players[0].chips).toBe(1000)
        
  
    })
    test('second game with all the same card, but uneven chip amounts.  2 all in and one folds', () => {
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
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.deck.deck = [...fixedDeck]
        game.isTest = true
        game.startGame()
        expect(game.turn).toBe(0)
        game.bet(100)//0
        game.bet(50)//1
        expect(game.round).toBe(0)
        game.bet(0)//2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(400) //1
        game.bet(400) //2
        game.bet(400) //0
        expect(game.round).toBe(2)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(100) //2
        game.fold() //0
        expect(game.round).toBe(3)
        expect(game.players[0].folded).toBe(true)
        game.bet(100) //1
        game.fold() //2
        //next hand
        expect(game.players[0].chips).toBe(400)
        expect(game.players[1].chips).toBe(2100)
        expect(game.players[2].chips).toBe(350)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(50) //2
        expect(game.round).toBe(0)
        game.bet(0) //0
        expect(game.round).toBe(1)
        expect(game.turn).toBe(2)
        game.bet(300) //2
        expect(game.players[2].allIn).toBe(400)
        expect(game.turn).toBe(0)
        game.bet(400) //0
        expect(game.players[0].allIn).toBe(500)
        game.bet(400) //1
        game.nextFlip()
        expect(game.round).toBe(2)
        game.nextFlip()
        expect(game.round).toBe(3)
        expect(game.pot).toBe(1400)
        game.deck.deck = [...fixedDeck]
        game.nextFlip()
        
        expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(450)
        expect(game.players[1].chips).toBe(2000)
        expect(game.players[2].chips).toBe(400)
        expect(game.checktotals()).toBe(true)
        expect(game.pot).toBe(150)
        game.deck.deck = [...fixedDeck] 
        //next hand
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(2)
        expect(game.turn).toBe(2)
        expect(game.players[0].chips).toBe(450)
        expect(game.players[1].chips).toBe(2000)
        expect(game.players[2].chips).toBe(400)
        game.bet(100) //2
        game.bet(50) //0
        expect(game.round).toBe(0)
        game.bet(0) //1
        expect(game.round).toBe(1)
        game.bet(400) //0
        expect(game.players[0].allIn).toBe(500)
        game.fold() //1
        expect(game.flipCards).toBe(false)
        game.bet(300) //2
        
        expect(game.players[2].allIn).toBe(400)
        expect(game.round).toBe(2)
        expect(game.flipCards).toBe(true)
        game.nextFlip()
        expect(game.round).toBe(3)
        expect(game.pot).toBe(1000)
        expect(game.round).toBe(3)
        game.deck.deck = [...fixedDeck]
        game.nextFlip()
        expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(550)
        expect(game.players[1].chips).toBe(1950)
        expect(game.players[2].chips).toBe(350)
        expect(game.checktotals()).toBe(true)
        expect(game.pot).toBe(150)
        expect(game.turn).toBe(0)
        expect(game.dealer).toBe(0)
        game.bet(100) //0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(0) //1
        game.bet(350) //2
       
        expect(game.players[2].allIn).toBe(450)
        game.bet(450) //0
        
        expect(game.betIndex).toBe(0)
        expect(game.players[0].allIn).toBe(550)
        expect(game.currentBet).toBe(450)
        expect(game.round).toBe(1)
        game.bet(450) //1
        expect(game.flipCards).toBe(true)
        // expect(game.round).toBe(2)
        game.nextFlip()
        expect(game.round).toBe(2)
        expect(game.pot).toBe(1550)
        game.nextFlip()
        expect(game.round).toBe(3)
        expect(game.pot).toBe(1550)

        game.nextFlip()
        expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(450)
        expect(game.players[1].chips).toBe(2000)
        expect(game.players[2].chips).toBe(400)
        expect(game.checktotals()).toBe(true)
        expect(game.pot).toBe(150)



    })
})