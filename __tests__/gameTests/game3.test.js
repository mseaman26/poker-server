import {Game} from '../../handlers/Game.js'


describe.skip('Game', () => {

    test('should return expected chip values after some betting', () => {
        const
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
        const game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.totalChips).toBe(5000)   
        expect(game.turn).toBe(3)
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
        game.bet(80)//  0 D
        expect(game.players[0].chips).toBe(0)
        game.bet(80)//  1
        expect(game.players[0].bet).toBe(5)
        expect(game.players[0].moneyInPot).toBe(5)
        expect(game.players[1].bet).toBe(66)
        expect(game.round).toBe(1)
        game.bet(80)//  2
        
        //pot square
        // expect(game.players[2].moneyInPot).toBe(80)
        // //round 2
        expect(game.round).toBe(3)
        expect(game.dealer).toBe(0)
        expect(game.players[0].chips).toBe(8)
        expect(game.players[1].chips).toBe(182)
        expect(game.players[2].chips).toBe(180)
        expect(game.players[3].chips).toBe(0)
        expect(game.players[4].chips).toBe(80)
        expect(game.pot).toBe(0)

        //next hand
        game.nextHand()

        // //hand 2 round 0 dealer 1
        expect(game.players.length).toBe(4)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(0)

        expect(game.players[0].chips).toBe(8)
        expect(game.players[1].chips).toBe(182) // D
        expect(game.players[2].chips).toBe(130)  // small blind - 50
        expect(game.players[3].chips).toBe(0)  // big blind - 80 (cant cover)

        // //checking totals
        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(chipsSum + game.pot).toBe(450)

        //round 0 betting
        game.bet(100) // 0
        expect(game.currentBet).toBe(100)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[0].allIn).toBe(8)
        game.bet(100) // 1
        expect(game.players[1].chips).toBe(82)
        expect(game.currentBet).toBe(100)
        game.bet(50) // 2
        expect(game.players[2].chips).toBe(80)
        

        //round 1
        expect(game.round).toBe(1)
        expect(game.dealer).toBe(1)

        //new hands
        players[0].numericalHand = 80
        players[1].numericalHand = 101
        players[2].numericalHand = 100
        players[3].numericalHand = 80
            //turn 2
        game.bet(80) // 2
        expect(game.players[2].chips).toBe(0)
        expect(game.players[2].allIn).toBe(180)
        expect(game.turn).toBe(1)
        expect(game.betIndex).toBe(2)
        expect(game.currentBet).toBe(80)
        expect(game.players[1].chips).toBe(82)
        expect(game.turn).toBe(1)
        expect(game.dealer).toBe(1)
        game.bet(80) // 1
        //games get handled here because everyone is all in except for player 1
        //player 1 wins
        





        
    })
})
