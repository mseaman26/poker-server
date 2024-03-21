
import {Game} from '../../handlers/Game.js'

describe.skip('Game', () => {
    test('should return a new game', () => {
        const game = new Game()
        expect(game).toBeInstanceOf(Game)
    })

    test('should return a new game with a roomId', () => {
        const game = new Game(1)
        expect(game.roomId).toBe(1)
    })

    test('should return expected chip values after some betting', () => {
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
            {
                id: 4,
                username: 'test4',
            }
        ]
        const game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.turn).toBe(3)
        expect(game.players[3].numericalHand).toBe(null)
        

        // new chip amounts
        game.players[0].chips = 5
        game.players[1].chips = 66
        game.players[2].chips = 260
        game.players[3].chips = 80
        game.players[4].chips = 39
        game.totalChips = 450

        //new hands
        players[0].numericalHand = 92
        players[1].numericalHand = 92
        players[2].numericalHand = 6
        players[3].numericalHand = 80
        players[4].numericalHand = 92

        game.players[0].moneyInPot = 0
        game.players[1].moneyInPot = 0
        game.players[2].moneyInPot = 0
        game.players[3].moneyInPot = 0
        game.players[4].moneyInPot = 0
        game.pot = 0
        game.betIndex = 0
        game.currentBet = 0
        expect(game.currentBet).toBe(0)
        game.players[0].bet = 0
        game.players[1].bet = 0
        game.players[2].bet = 0
        game.players[3].bet = 0
        game.players[4].bet = 0


        let betSum = 0
        let chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }

        expect(betSum).toBe(0)
        expect(chipsSum + game.pot).toBe(game.totalChips)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(3)
        game.bet(0) //3
        game.bet(39) //4
        expect(game.players[4].chips).toBe(0)
        game.bet(39) //0  cant cover, only 5
        expect(game.players[0].chips).toBe(0)
        game.bet(39) //1
        game.fold() //2
        expect(game.round).toBe(0)
        expect(game.players[0].allIn).toBe(5)
        expect(game.players[1].allIn).toBe(null)
        expect(game.players[2].allIn).toBe(null)
        expect(game.players[3].allIn).toBe(null)
        expect(game.players[4].allIn).toBe(39)
        expect(game.pot).toBe(83)
        expect(game.dealer).toBe(0)
        game.fold() //3

        //next hand
        game.nextHand()
        expect(game.dealer).toBe(1)
        expect(game.players.length).toBe(5)
        // expect(game.round).toBe(0)
        expect(game.round).toBe(0)
        expect(game.pot).toBe(130)
        expect(game.maxBet).toBe(80)
        
        expect(game.turn).toBe(4)
        expect(game.foldedCount).toBe(0)
        expect(game.players.length).toBe(5)
        expect(game.players[0].chips).toBe(5)
        expect(game.players[1].chips).toBe(66)
        expect(game.players[2].chips).toBe(210)
        expect(game.players[3].chips).toBe(0)
        expect(game.players[4].chips).toBe(39)

        // betSum = 0
        // chipsSum = 0
        // for(let i = 0; i < game.players.length; i++){
        //     betSum += players[i].bet
        // }
        // for(let i = 0; i < game.players.length; i++){
        //     chipsSum += players[i].chips
        // }
        // expect(game.pot).toBe(83)  
        // expect(chipsSum + game.pot).toBe(game.totalChips)
        // expect(game.foldedCount).toBe(2)
        // expect(game.round).toBe(1)
        // expect(game.players.length).toBe(5)

        // //ROUND 1 (3 Players)
       
        // expect(game.maxBet).toBe(0)
        // expect(game.players[0].chips).toBe(0)
        // expect(game.players[0].moneyInPot).toBe(5)
        // expect(game.players[1].chips).toBe(27)
        // expect(game.players[1].moneyInPot).toBe(39)
        // expect(game.players[2].folded === true)
        // expect(game.players[2].moneyInPot).toBe(0)
        // expect(game.players[3].moneyInPot).toBe(0)
        // expect(game.players[3].folded === true)
        // expect(game.players[4].allIn).toBe(39)
        // expect(game.players[4].chips).toBe(0)
        // expect(game.players[4].moneyInPot).toBe(39)

        // expect(game.foldedCount + game.allInCount).toEqual(game.players.length - 1)
        // expect(game.round).toBe(0)


        
    })
})
