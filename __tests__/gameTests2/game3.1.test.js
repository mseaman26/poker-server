
import {Game} from '../../handlers/Game.js'
import { deck2_1, deck3_1, deck3_2} from '../../handlers/fixedDecks.js'
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
        game.isTest = true
        game.deck.deck = [...deck2_1]
        expect(game.deck.deck.length).toBe(52)
        
        game.startGameNoShuffle()
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.round).toBe(0)
        expect(game.currentBet).toBe(100)
        expect(game.pot).toBe(150)
        expect(game.checktotals()).toBe(true)
        //round 0
        game.bet(50) //1
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        game.bet(0) //0
        //round 1
        expect(game.round).toBe(1)
        expect(game.checktotals()).toBe(true)
        expect(game.turn).toBe(1)
        game.bet(325) //1
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(1)
        game.bet(325) //0
        expect(game.round).toBe(2)
        //round 2
        expect(game.turn).toBe(1)
        game.bet(200) //1
        game.bet(203) //0
        expect(game.round).toBe(2)
        game.bet(3)  //1
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(3)
        //round 3
        game.bet(0) //1
        game.bet(0) //2
        //next hand
        game.deck.deck = [...deck3_1]
        game.deck.dealPockets(game.players)
        expect(game.checktotals()).toBe(true)
        expect(game.players[0].chips).toBe(322) //small blinds
        expect(game.players[1].chips).toBe(1528) //big blinds
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(0)
        //round 0
        game.bet(50) //0
        expect(game.round).toBe(0)
        game.bet(0) //1
        expect(game.round).toBe(1)
        //round 1
        game.bet(100) //0
        game.bet(100) //1
       
        //round 2
        game.bet(0) //0
        expect(game.round).toBe(2)
        game.bet(0) //1
        //round 3
        game.bet(0) //0
       
        // expect(game.round).toBe(3)
        // expect(game.players[0].moneyInPot).toBe(200)
        expect(game.pot).toBe(400)
        game.bet(0) //1

        expect(game.round).toBe(0)
        expect(game.checktotals()).toBe(true)
        expect(game.dealer).toBe(0)
        expect(game.pot).toBe(150)
        expect(game.players[0].chips).toBe(272) //big blinds
        expect(game.players[1].chips).toBe(1578) //small blinds
        expect(game.pot).toBe(150)
        expect(game.turn).toBe(1)
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //0
        game.deck.deck = [...deck3_2]
        game.deck.dealPockets(game.players)
        game.flop = game.deck.dealFlop()
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        //round 1
       
        game.bet(0) //1
        game.bet(270) //0
        expect(game.betIndex).toBe(0)
        game.bet(270) //1
        expect(game.round).toBe(2)
        expect(game.players[0].chips).toBe(2)

        //round 2
        expect(game.round).toBe(2)
       
        game.deck.dealPockets(game.players)
        game.flop = game.deck.dealFlop()
        expect(game.flop.length).toBe(3)
        
        game.bet(0) //1
        game.bet(0) //0
        //expect(game.dealer).toBe(0)
        // //round 3
        game.bet(0) //1
        expect(game.round).toBe(3)
        game.bet(0) //0
        // // //next hand
        expect(game.players.length).toBe(2)
        expect(game.players[1].chips).toBe(1898)  //had two chips, but is small blind 
    })
})
