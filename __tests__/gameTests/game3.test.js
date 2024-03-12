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
    test('should return a new game with a roomId and players', () => {
        const players = [
            {
                id: 0,
                username: 'test1',    
            },
            {
                id: 1,
                username: 'test2',    
            },
            {
                id: 2,
                username: 'test3',    
            },
            {
                id: 3,
                username: 'test4',    
            },
            {
                id: 4,
                username: 'test5',
            }
        ]
        const game = new Game(1, players)
        expect(game.players).toEqual(players)
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
        game.bet(100)
        game.bet(100)
        game.bet(100)
        game.bet(50)
        game.bet(0)
        //round 1
        expect(game.round).toBe(1)
        let betSum = 0
        let chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(betSum + chipsSum + game.pot).toBe(5000)
        expect(game.players[0].chips).toBe(900)
        expect(game.players[1].chips).toBe(900)
        expect(game.players[2].chips).toBe(900)
        expect(game.players[3].chips).toBe(900)
        expect(game.players[4].chips).toBe(900)

        // new chip amounts
        game.players[0].chips = 5
        game.players[1].chips = 66
        game.players[2].chips = 260
        game.players[3].chips = 80
        game.players[4].chips = 39

        game.players[0].moneyInPot = 0
        game.players[1].moneyInPot = 0
        game.players[2].moneyInPot = 0
        game.players[3].moneyInPot = 0
        game.players[4].moneyInPot = 0
        game.pot = 0
        game.players[0].bet = 0
        game.players[1].bet = 0
        game.players[2].bet = 0
        game.players[3].bet = 0
        game.players[4].bet = 0

        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(betSum).toBe(0)
        expect(betSum + chipsSum + game.pot).toBe(450)

        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)

        //round 1 betting
        game.bet(0)//  1
        game.bet(0)//  2
        game.bet(80)//  3
        game.bet(80)//  4
        game.bet(80)//  0
        console.log('money in pot after betting 80 ',game.players[0].moneyInPot)
        game.bet(80)//  1
        expect(game.players[0].bet).toBe(5)
        expect(game.players[0].moneyInPot).toBe(5)
        game.bet(80)//  2

        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(0)
        expect(game.players[2].chips).toBe(180)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[0].chips).toBe(0)

        //checking numbers
        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(chipsSum).toBe(180)
        expect(game.pot).toBe(270)

        players[0].numericalHand = 92
        players[1].numericalHand = 92
        players[2].numericalHand = 6
        players[3].numericalHand = 80
        players[4].numericalHand = 92

        expect(game.players[0].maxWin).toBe(25)
        expect(game.players[1].maxWin).toBe(242)
        expect(game.players[2].maxWin).toBe(null)
        expect(game.players[3].maxWin).toBe(270)
        expect(game.players[4].maxWin).toBe(161)

        game.handleNumericalHands()

        expect(game.players[0].chips).toBe(8)
        expect(game.players[4].chips).toBe(80)
        expect(game.players[1].chips).toBe(182)

       

        //checking totals
        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(betSum + chipsSum + game.pot).toBe(450)
        
    })
})
