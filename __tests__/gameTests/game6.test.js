
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
            },
            {
                id: 5,
                username: 'test5',
            },  
            {
                id: 6,
                username: 'test6',
            },
            {
                id: 7,
                username: 'test7',
            }
        ]
        const game = new Game(1, players, 0, 99, 999)
        game.startGame()

        //hand 0 hands
        //TODO: make these into real hands, maybe put them right before nexthand is and use findHAnd and rankHands to add the real numerical hands to the players 
        game.players[0].numericalHand = 97
        game.players[1].numericalHand = 2
        game.players[2].numericalHand = 3
        game.players[3].numericalHand = 55
        game.players[4].numericalHand = 76
        game.players[5].numericalHand = 23
        game.players[6].numericalHand = 45
        game.players[7].numericalHand = 98 

        expect(game).toBeInstanceOf(Game)
        expect(game.turn).toBe(3)
        expect(game.players[2].bet).toBe(99)
        expect(game.currentBet).toBe(99)
        expect(game.pot).toBe(148)
        game.bet(99) //3
        game.fold() //4
        game.bet(99) //5    
        game.bet(99) //6
        game.bet(99) //7
        game.bet(99) //0
        game.bet(50) //1
        expect(game.betIndex).toBe(3)
        game.bet(0) //2
        //pot sqaure
        //round 1
        console.log(' round 1 flop', game.flop)
        expect(game.round).toBe(1)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(0)
        expect(game.pot).toBe(693)
        expect(game.turn).toBe(1)
        game.bet(69) //1
        game.bet(69) //2
        game.fold() //3
        game.fold() //5
        game.bet(69) //6
        game.bet(69) //7
        game.bet(79) //0
        game.bet(10) //1
        game.bet(10) //2
        game.fold() //6
        game.bet(10) //7
        //pot sqaure
        //round 2
        expect(game.round).toBe(2)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.pot).toBe(1078)
        game.bet(600) //1
        game.bet(600) //2
        game.bet(600) //7
        expect(game.betIndex).toBe(1)
        game.bet(600) //0
        //pot sqaure
        //round 3
        expect(game.round).toBe(3)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.pot).toBe(3478)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //7
        expect(game.betIndex).toBe(1)
        game.bet(0) //0
        //pot sqaure
        //end of hand, still round 3
        expect(game.players[0].chips).toBe(221)
        expect(game.players[1].chips).toBe(221)
        expect(game.players[2].chips).toBe(221)
        expect(game.players[3].chips).toBe(900)
        expect(game.players[4].chips).toBe(999)
        expect(game.players[5].chips).toBe(900)
        expect(game.players[6].chips).toBe(831)
        expect(game.players[7].chips).toBe(3699)

        game.nextHand()
        //hand 1
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(4)

        expect(game.pot).toBe(148)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(99)
        expect(game.players[0].chips).toBe(221)
        expect(game.players[1].chips).toBe(221)
        expect(game.players[2].chips).toBe(172)
        expect(game.players[3].chips).toBe(801)
        expect(game.players[4].chips).toBe(999)
        expect(game.players[5].chips).toBe(900)
        expect(game.players[6].chips).toBe(831)
        expect(game.players[7].chips).toBe(3699)

        //new hands hand 1
        game.players[0].numericalHand = 4
        game.players[1].numericalHand = 15
        game.players[2].numericalHand = 6
        game.players[3].numericalHand = 80
        game.players[4].numericalHand = 934
        game.players[5].numericalHand = 25
        game.players[6].numericalHand = 92
        game.players[7].numericalHand = 33
        //round 0  betting
        game.bet(112) //4
        game.fold() //5
        game.fold() //6
        game.bet(112) //7
        game.bet(200) //0
        game.bet(200) //1
        game.bet(151) //2
        game.bet(101) //3
        game.bet(88) //4
        game.bet(88) //7
        
        expect(game.round).toBe(1)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(0)
        expect(game.turn).toBe(2)
        expect(game.pot).toBe(1200)
        //round 1  betting
        game.bet(0) //2
        game.bet(176) //3
        expect(game.betIndex).toBe(3)
        game.bet(176) //4
        expect(game.turn).toBe(7)
        game.bet(176) //7
        game.bet(176) //0
        game.bet(176) //1
        game.fold() //2  
        //round 2
        expect(game.pot).toBe(1770)
        expect(game.round).toBe(2)
        expect(game.turn).toBe(3)
        expect(game.players[3].chips).toBe(524)    
        game.bet(524) //3
        expect(game.players[3].allIn).toBe(900) 
        game.bet(623) //4
        expect(game.currentBet).toBe(623)
        
        expect(game.pot).toBe(2917)
        game.bet(623) //7
        //handledhands
        //player 4 wins
        
        expect(game.round).toBe(3)
        //next hand
        //round 0
        game.nextHand()
        //new hands
        game.players[0].numericalHand = 91
        game.players[1].numericalHand = 91
        game.players[2].numericalHand = 6
        game.players[3].numericalHand = 80
        game.players[4].numericalHand = 92
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(3)
        expect(game.pot).toBe(148)
        expect(game.players.length).toBe(5)    
        game.bet(831) //3
        game.bet(831) //4
        game.bet(21) //0
        expect(game.betIndex).toBe(3)
        expect(game.currentBet).toBe(831)
        game.bet(782) //1
        expect(game.betIndex).toBe(3)
        game.bet(732) //2

        expect(game.round).toBe(1)
        expect(game.betIndex).toBe(null)
        expect(game.currentBet).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.pot).toBe(3345)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(2709)
        expect(game.players[2].chips).toBe(69)
        expect(game.players[3].chips).toBe(0)
        expect(game.players[4].chips).toBe(1869)
        expect(game.checktotals()).toBe(true)

        //round 1 betting
        game.bet(0) //1
        game.bet(69) //2
        expect(game.betIndex).toBe(2)
        expect(game.currentBet).toBe(69)
        expect(game.players[2].allIn).toBe(900)
        //3 all in, so is skipped
        expect(game.turn).toBe(4)
        game.bet(69) //4
        //0 is skipped because they are all in
        expect(game.turn).toBe(1)
        expect(game.betIndex).toBe(2)
        expect(game.players[1].chips).toBe(2709)
        game.bet(709) //1
        expect(game.players[1].chips).toBe(2000)
        expect(game.turn).toBe(4)
        game.bet(571) //4
        //pot square
        //round 2
        expect(game.round).toBe(2)
        expect(game.betIndex).toBe(null)
        expect(game.turn).toBe(1)
        game.bet(0) //1
        expect(game.turn).toBe(4)
        expect(game.pot).toBe(4763)
        game.bet(0) //4
        //pot square
        //round 3
        expect(game.round).toBe(3)
        expect(game.betIndex).toBe(null)
        expect(game.turn).toBe(1)
        expect(game.checktotals()).toBe(true)
        expect(game.pot).toBe(4763)
        expect(game.players[1].chips).toBe(2000)
        expect(game.players[4].chips).toBe(1229)
        //round 3 betting
        game.bet(1229) //1
        expect(game.pot).toBe(5992)
        expect(game.turn).toBe(4)
        game.bet(1229) //4
        //pot square
        //player 4 wins
        expect(game.players[0].chips).toBe(34)
        expect(game.players[1].chips).toBe(806)
        expect(game.players[2].chips).toBe(0)
        expect(game.players[2].chips).toBe(0)
        expect(game.players[4].chips).toBe(7152) 
        //players 2 and 3 will be eliminated
        game.nextHand()
        //next hand
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(1)
        expect(game.currentBet).toBe(99)
        expect(game.pot).toBe(83)
        expect(game.players.length).toBe(3)
        //new hands
        game.players[0].numericalHand = 1
        game.players[1].numericalHand = 2
        game.players[2].numericalHand = 3
        expect(game.maxBet).toBe(806)
        game.bet(806) //1
        expect(game.currentBet).toBe(806)
        game.fold() //2
        //pot square
        // handledHands
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(889)
        expect(game.players[2].chips).toBe(7103)
        //player 0 is eliminated
        game.nextHand()
        //new hands
        game.players[0].numericalHand = 2
        game.players[1].numericalHand = 2
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(0)
        expect(game.currentBet).toBe(99)
        expect(game.players[0].chips).toBe(840)
        expect(game.players[1].chips).toBe(7004)
        //round 0 betting
        game.bet(840) //0
        expect(game.currentBet).toBe(889)
        expect(game.turn).toBe(1)
        game.bet(790) //1
        expect(game.currentBet).toBe(0)
        expect(game.pot).toBe(0)
        expect(game.players[0].chips).toBe(889)
        expect(game.players[1].chips).toBe(7103)
        game.nextHand()
        //new hands
        game.players[0].numericalHand = 2
        game.players[1].numericalHand = 3
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.currentBet).toBe(99)
        expect(game.players[0].chips).toBe(790)
        expect(game.players[1].chips).toBe(7054)
        game.bet(840) //1
        game.bet(790) //0
        expect(game.pot).toBe(0)
        expect(game.players[0].chips).toBe(0)
        expect(game.players[1].chips).toBe(game.totalChips)
        game.nextHand()


    })
})
