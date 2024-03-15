
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
        expect(game.totalChips).toBe(5000)
        expect(game.maxBet).toBe(1000)
        expect(game.turn).toBe(3)
        expect(game.hand).toBe(0)
        expect(game.players[3].numericalHand).toBe(null)
        

        // new chip amounts
        game.players[0].chips = 450
        game.players[1].chips = 271
        game.players[2].chips = 27
        game.players[3].chips = 985
        game.players[4].chips = 600
        game.totalChips = 2333
        game.maxBet = 271

        //new hands
        players[0].numericalHand = 100
        players[1].numericalHand = 100
        players[2].numericalHand = 6
        players[3].numericalHand = 80
        players[4].numericalHand = 92

        game.players[0].moneyInPot = 0
        game.players[1].moneyInPot = 0
        game.players[2].moneyInPot = 0
        game.players[3].moneyInPot = 0
        game.players[4].moneyInPot = 0
        game.pot = 0
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
            betSum += game.players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += game.players[i].chips
        }

        expect(betSum).toBe(0)
        expect(chipsSum + game.pot).toBe(game.totalChips)
        expect(chipsSum + betSum).toBe(game.totalChips)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(3)
        //round 0 betting turn 3
        expect(game.currentBet).toBe(0)
        expect(game.maxBet).toBe(271)
        expect(game.betIndex).toBe(null)
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //0
        game.bet(271) //1
        expect(game.betIndex).toBe(1)
        expect(game.currentBet).toBe(271)
        game.bet(271) //2
        expect(game.betIndex).toBe(1)
        expect(game.currentBet).toBe(271)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(3)
        expect(game.players[2].chips).toBe(0)
        expect(game.players[2].allIn).toBe(27)
        expect(game.players[2].bet).toBe(27)
        expect(game.currentBet).toBe(271)
        game.fold() //3
        game.fold() //4
        expect(game.foldedCount).toBe(2)
        expect(game.pot).toBe(298)
        expect(game.betIndex).toBe(1) 
        expect(game.turn).toBe(0)
        game.bet(271) //0

        //next hand
        game.nextHand()
        expect(game.dealer).toBe(1)
        expect(game.hand).toBe(1)  
        expect(game.players[0].chips).toBe(464)
        //new hands
        players[0].numericalHand = 56
        players[1].numericalHand = 100
        players[2].numericalHand = 6
        players[3].numericalHand = 80

        expect(game.round).toBe(0)  
        expect(game.turn).toBe(0)
        expect(game.pot).toBe(150)
        expect(game.currentBet).toBe(100)
        expect(game.players[2].bet).toBe(50)
        expect(game.players[3].bet).toBe(100)

        console.log('players: ', game.players)  

        betSum = 0
        chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += game.players[i].bet
            console.log('adding bet: ', players[i].bet, " for player: ", i)
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += game.players[i].chips
        }
        console.log('chips sum: ', chipsSum)
        expect(betSum).toBe(150)
        expect(chipsSum + game.pot).toBe(game.totalChips)
        //round 0 betting turn 0, D 1
        expect(game.betIndex).toBe(null)
        game.bet(200) //0
        expect(game.betIndex).toBe(0)
        game.bet(284) //1
        expect(game.betIndex).toBe(1)
        expect(game.currentBet).toBe(284)
        game.bet(234) //2
        expect(game.currentBet).toBe(284)
        expect(game.betIndex).toBe(1)
        game.bet(184) //3
        expect(game.currentBet).toBe(284)
        expect(game.betIndex).toBe(1)
        game.bet(84) //4
        //pot square
        //round 1, D 1
        expect(game.round).toBe(1)
        expect(game.players[0].chips).toBe(180)
        expect(game.players[1].chips).toBe(0)
        expect(game.players[1].allIn).toBe(284)
        expect(game.players[2].chips).toBe(701)
        expect(game.players[3].chips).toBe(316)
        expect(game.turn).toBe(2)  
        expect(game.pot).toBe(1136)
        expect(game.currentBet).toBe(0)
        expect(game.betIndex).toBe(null)
        expect(game.maxBet).toBe(316)
        game.bet(316) //2
        expect(game.betIndex).toBe(2)
        game.fold() //3
        expect(game.foldedCount).toBe(1)
        expect(game.players[0].moneyInPot).toBe(284)
        expect(game.pot).toBe(1452)
        game.fold() //4
        expect(game.foldedCount).toBe(2)
        expect(game.players[1].allIn).toBe(284)
        //chips sorted by handleNumericHands, but next hand not called yet
        expect(game.players[0].chips).toBe(180)
        expect(game.players[1].chips).toBe(1136)
        expect(game.players[2].chips).toBe(701)
        expect(game.players[3].chips).toBe(316)

        
        //next hand
        game.nextHand()
        //new hands
        expect(game.hand).toBe(2) 
        expect(game.checktotals()).toBe(true)
        game.players[0].numericalHand = 56
        game.players[1].numericalHand = 100
        game.players[2].numericalHand = 101
        game.players[3].numericalHand = 80
  
        expect(game.dealer).toBe(2) 
        expect(game.round).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.pot).toBe(150)
        expect(game.currentBet).toBe(100)
        expect(game.players[0].chips).toBe(80)
        expect(game.players[1].chips).toBe(1136)
        expect(game.players[2].chips).toBe(701)
        expect(game.players[3].chips).toBe(266)
       
        expect(game.foldedCount).toBe(0)
        expect(game.players.length).toBe(4)
        

        //round 0 betting turn 1, D 2
        expect(game.betIndex).toBe(null)
        expect(game.foldedCount).toBe(0)
        expect(game.players[0].chips).toBe(80)
        expect(game.players[1].chips).toBe(1136)
        expect(game.players[2].chips).toBe(701)
        expect(game.players[3].chips).toBe(266)
        expect(game.players[0].folded).toBe(false)
        expect(game.players[1].folded).toBe(false)
        expect(game.players[2].folded).toBe(false)
        expect(game.players[3].folded).toBe(false)
        expect(game.allInCount).toBe(0)
        expect(game.maxBet).toBe(701)
        game.bet(701) //1
        expect(game.betIndex).toBe(1)
        expect(game.currentBet).toBe(701)
        game.bet(701) //2
        game.fold() //3
        expect(game.foldedCount).toBe(1)
        expect(game.players[3].folded).toBe(true)
        expect(game.betIndex).toBe(1)
        expect(game.turn).toBe(0)
        
        game.bet(601) //0
        //pot square
        //all are folded or all in except 1, so handleNumericalHands is called
        //0 is eliminated
        
        expect(game.round).toBe(1)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(435)
        expect(game.players[2].chips).toBe(1632)
        expect(game.players[3].chips).toBe(266)
        
        //next hand
        game.nextHand()
        expect(game.hand).toBe(3)
        expect(game.checktotals()).toBe(true)
        expect(game.dealer).toBe(2)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(2)
        expect(game.pot).toBe(150)
        expect(game.currentBet).toBe(100)
        expect(game.players.length).toBe(3)
        expect(game.foldedCount).toBe(0)
        expect(game.players[0].chips).toBe(385)
        expect(game.players[1].chips).toBe(1532)
        expect(game.players[2].chips).toBe(266)
        //new hands
        game.players[0].numericalHand = 100
        game.players[1].numericalHand = 100
        game.players[2].numericalHand = 6
        game.bet(266) //2
        expect(game.currentBet).toBe(266)
        game.bet(216) //0
        expect(game.betIndex).toBe(2)
        game.bet(166) //1
        //pot square
        //round 1, D 2
        expect(game.betIndex).toBe(null)
        expect(game.round).toBe(1)
        expect(game.players[0].chips).toBe(169)
        expect(game.players[1].chips).toBe(1366)
        expect(game.players[2].chips).toBe(0)
        expect(game.pot).toBe(798)
        console.log('game game game', game)
        expect(game.checktotals()).toBe(true)
        expect(game.turn).toBe(0)
        game.bet(0) //0
        expect(game.betIndex).toBe(0)
        game.bet(169) //1
        expect(game.betIndex).toBe(1)
        expect(game.turn).toBe(0)
        expect(game.round).toBe(1)
        game.bet(169) //1
        //pot square
        //round 2, D 2
        expect(game.round).toBe(2)
        expect(game.pot).toBe(0)
        expect(game.players[0].chips).toBe(568)
        expect(game.players[1].chips).toBe(1765)
        expect(game.players[2].chips).toBe(0)
        //next hand
        //round 0 D 0
        game.nextHand()
        expect(game.hand).toBe(4)
        expect(game.checktotals()).toBe(true)
        expect(game.dealer).toBe(0)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.pot).toBe(150)
        expect(game.players.length).toBe(2)
        expect(game.foldedCount).toBe(0)
        expect(game.players[0].chips).toBe(468)
        expect(game.players[1].chips).toBe(1715)
        //new hands
        game.players[0].numericalHand = 99
        game.players[1].numericalHand = 100
        game.bet(516) //1  small blinds
        expect(game.currentBet).toBe(566)
        game.bet(466) //0  big blinds
        //pot square
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(2) //1
        game.fold() //0
        //handleNumericalHands
        expect(game.players[0].chips).toBe(2)
        expect(game.pot).toBe(0)
        expect(game.players[1].chips).toBe(2331)
        //next hand
        game.nextHand()
        //handleNumericalHands gets called immediately only one non-all-in player
        expect(game.hand).toBe(5)
        expect(game.dealer).toBe(1)
        // expect(game.round).toBe(0)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(2333)
        expect(game.players.length).toBe(2)
        game.nextHand()
        expect(game.round).toBe(0)
        console.log('winner: ', game.players[0])
        // expect(game.currentBet).toBe(100)
        // expect(game.pot).toBe(102)
        // expect(game.checktotals()).toBe(true)
        // expect(game.dealer).toBe(1)
        
    })
})
