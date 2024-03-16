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
        expect(game.turn).toBe(3)
        game.bet(100) //3
        expect(game.betIndex).toBe(3)
        game.bet(100) //4
        game.bet(100) //0
        game.bet(50) //1
        
        expect(game.round).toBe(0)
        let betSum = 0
        let chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(betSum).toBe(500)
        // expect(betSum + chipsSum).toBe(5000)
        expect(game.pot + chipsSum).toBe(5000)

        game.bet(0) //2
        //round 1
        expect(game.round).toBe(1)
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)

        expect(game.players[0].chips).toBe(900)
        expect(game.players[1].chips).toBe(900)
        expect(game.players[2].chips).toBe(900)
        expect(game.players[3].chips).toBe(900)
        expect(game.players[4].chips).toBe(900)

        // new chip amounts
        game.players[0].chips = 1000
        game.players[1].chips = 750
        game.players[2].chips = 500
        game.players[3].chips = 250
        game.players[4].chips = 1250
        for(let i = 0; i < game.players.length; i++){
            game.players[i].moneyInPot = 0
        }
        //total chips 3750
        game.pot = 0

        expect(game.players[0].chips).toBe(1000)
        expect(game.players[1].chips).toBe(750)
        expect(game.players[2].chips).toBe(500)
        expect(game.players[3].chips).toBe(250)
        expect(game.players[4].chips).toBe(1250)
        expect(game.pot).toBe(0)
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)

        //round 1
        expect(game.round).toBe(1)
        game.bet(0) //1  
        game.bet(0) //2
        game.bet(250) //3  all in 
        game.bet(250) //4 call  1000
        game.bet(250) //0 call  750 D
        game.bet(750) //1 raise all in *B  0
        game.bet(500) //2 all in (cant cover)  0
        expect(game.players[2].chips).toBe(0)
        expect(game.players[2].moneyInPot).toBe(500)
        game.bet(500) //4 call 500
        game.bet(500) //0 call 250
        expect(game.players[0].chips).toBe(250)
        expect(game.allInCount).toBe(3)
        //pot square

        // round 2
        expect(game.pot).toBe(3000)
        expect(game.round).toBe(2)
        expect(game.turn).toBe(4) // because players 1,2, and 3 are all in
        expect(game.betIndex).toBe(null)
        expect(game.players[0].maxWin).toBe(null)
        expect(game.players[1].maxWin).toBe(3000)
        expect(game.players[2].maxWin).toBe(2250)
        expect(game.players[3].maxWin).toBe(1250)
        expect(game.players[4].maxWin).toBe(null)
        expect(game.players[0].chips).toBe(250)
        expect(game.players[1].chips).toBe(0)
        expect(game.players[0].moneyInPot).toBe(750)
        expect(game.players[1].moneyInPot).toBe(750)
        expect(game.players[2].moneyInPot).toBe(500)

        expect(game.players[2].chips).toBe(0)
        expect(game.players[3].chips).toBe(0)
        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(chipsSum).toBe(750)
        expect(game.pot).toBe(3000)
        players[0].numericalHand = 80
        players[1].numericalHand = 55
        players[2].numericalHand = 55
        players[3].numericalHand = 80
        players[4].numericalHand = 55

        
        

        game.handleNumericalHands()
        //hand 2 round 0 dealer 1

        //next hand
        game.nextHand()
        betSum = 0
        chipsSum = 0
        expect(game.players.length).toBe(3)
        for(let i = 0; i < game.players.length; i++){
            betSum += game.players[i].bet
        }
        expect(betSum).toBe(150)
        for(let i = 0; i < game.players.length; i++){
            chipsSum += game.players[i].chips
        }
        expect(game.round).toBe(0)

        expect(game.pot).toBe(150)
        expect(chipsSum).toBe(3600)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(1)
        expect(betSum + chipsSum).toBe(3750)
        expect(game.pot + chipsSum).toBe(3750)
        expect(game.players[1].chips).toBe(625)
        expect(game.players[0].chips).toBe(2525)

        //hand 2 round 0 betting
        game.bet(625) //1
        expect(game.players[1].allIn).toBe(625)
        expect(game.players[1].chips).toBe(0)
        game.bet(625) //2
        expect(game.players[2].allIn).toBe(500)
        expect(game.players[2].chips).toBe(0)
        expect(game.pot).toBe(1225)


        console.log('game at end of test 1', game)
    })
})