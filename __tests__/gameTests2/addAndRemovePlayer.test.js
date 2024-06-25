
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
        game.startGame()
        expect(game.dealer).toBe(0)
        expect(game.deck.deck.length).toBe(42)
        game.addPlayer({id: 5, username: 'test5'})
        expect(game.players.length).toBe(6)
        expect(game.turn).toBe(3)
        game.bet(100) //3
        game.bet(100) //4
        expect(game.turn).toBe(0)
        expect(game.players[5].eliminated).toBe(true)
        game.bet(100) //0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(200) //1
        game.bet(200) //2
        game.bet(200) //3
        game.bet(200) //4
        expect(game.round).toBe(1)
        game.bet(200) //0
        expect(game.round).toBe(2)
        game.buyBack(5, 1000)//player 5 buying in
        expect(game.players[5].eliminated).toBe(true)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        expect(game.round).toBe(2)
        game.bet(0) //0
        expect(game.round).toBe(3)
        expect(game.turn).toBe(1)
        game.bet(0) //1
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        expect(game.round).toBe(3)
        game.bet(0) //0
        game.nextHand()
        //NEXT HAND
        expect(game.players.length).toBe(6)
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(4)
        game.bet(100) //4
        expect(game.turn).toBe(5)
        game.bet(100) //5
        expect(game.players[5].chips).toBe(900)
        game.bet(100) //0
        game.bet(100) //1
        game.bet(50) //2
        expect(game.round).toBe(0)
        game.bet(0) //3
        expect(game.round).toBe(1)
        expect(game.turn).toBe(2)
        game.bet(200) //2
        game.bet(200) //3
        //ADD PLAYER
        game.addPlayer({id: 6, username: 'test6'})
        expect(game.players.length).toBe(7)
        game.bet(200) //4
        game.bet(200) //5
        expect(game.turn).toBe(0)
        game.bet(200) //0
        expect(game.round).toBe(1)
        game.bet(200) //1
        expect(game.round).toBe(2)
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        game.buyBack(6, 1000)//player 6 buying in
        game.bet(0) //5
        expect(game.turn).toBe(0)
        game.bet(0) //0
        expect(game.round).toBe(2)
        game.bet(0) //1
        expect(game.round).toBe(3)
        expect(game.turn).toBe(2)
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //5
        expect(game.round).toBe(3)
        game.bet(0) //0
        game.bet(0) //1
        expect(game.handComplete).toBe(true)
        game.deck.deck = [...deck2_1_1]
        game.nextHand()
        //NEXT HAND
        
        expect(game.players.length).toBe(7)
        expect(game.deck.deck.length).toBe(38)
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(2)
        expect(game.turn).toBe(5)
        game.bet(100) //5
        expect(game.turn).toBe(6)
        game.bet(100) //6
        expect(game.players[6].chips).toBe(900)
        game.bet(100) //0
        game.bet(100) //1
        game.bet(100) //2
        game.bet(50) //3
        expect(game.round).toBe(0)
        game.bet(0) //4
        expect(game.round).toBe(1)
        expect(game.turn).toBe(3)
        game.bet(100) //3
        game.bet(100) //4
        game.bet(100) //5
        game.bet(100) //6

        game.removePlayer(3) //player 3 leaves game

        game.bet(100) //0
        game.bet(100) //1
        expect(game.round).toBe(1)
        game.bet(100) //2
        expect(game.round).toBe(2)  
        expect(game.players.length).toBe(7)
        expect(game.players[4].eliminated).toBe(false)
        expect(game.turn).toBe(3)
        game.bet(0) //3
        expect(game.turn).toBe(4)
        game.bet(0) //4
        expect(game.turn).toBe(5)
        game.bet(0) //5
        game.bet(0) //6
        game.bet(0) //0
        game.bet(0) //1
        expect(game.round).toBe(2)
        game.bet(0) //2
        expect(game.round).toBe(3)
        expect(game.turn).toBe(3)
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //5
        game.bet(0) //6
        game.bet(0) //0
        game.bet(0) //1
        expect(game.round).toBe(3)
        game.bet(0) //2
        expect(game.handComplete).toBe(true)
        game.deck.deck = [...deck2_1_2]
        game.nextHand()
        //NEXT HAND
        expect(game.players.length).toBe(6)
        expect(game.deck.deck.length).toBe(40)
        expect(game.checktotals()).toBe(true)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(3)
        expect(game.players[game.dealer].username).toBe('test4')
        expect(game.turn).toBe(0)
        expect(game.eliminatedCount).toBe(0)
        expect(game.players[game.turn].username).toBe('test0')
        game.bet(100) //0
        game.bet(100) //1
        game.bet(100) //2
        game.bet(100) //3
        game.bet(50) //4
        expect(game.round).toBe(0)
        game.bet(0) //5
        expect(game.round).toBe(1)
        game.removePlayer(3) //player 3 (test4) leaves game
        game.removePlayer(2) //player 2 leaves game
        game.removePlayer(5) //player 5 (test6) leaves game
        game.removePlayer(4) //player 4 (test5) leaves game
        
        expect(game.exitingPlayers.length).toBe(4)  
        expect(game.turn).toBe(4)
        game.bet(0) //4
        game.bet(0) //5
        game.bet(0) //0
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(1)
        game.bet(0) //3
        expect(game.round).toBe(2)
        game.bet(0) //4
        game.bet(0) //5
        game.bet(0) //0
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(2)
        game.bet(0) //3
        expect(game.round).toBe(3)
        game.bet(0) //4
        game.bet(0) //5
        game.bet(0) //0
        game.bet(0) //1
        game.bet(0) //2
        expect(game.round).toBe(3)
        game.bet(0) //3
        expect(game.handComplete).toBe(true)
        game.deck.deck = [...deck2_1_3]
        console.log(game.exitingPlayers)
        game.nextHand()
        // //NEXT HAND
        expect(game.players.length).toBe(2)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.eliminatedCount).toBe(0)
        expect(game.checktotals()).toBe(true)
        console.log('total chips: ', game.totalChips)
        console.log('player 0 chips: ', game.players[0].chips)
        console.log('player 1 chips: ', game.players[1].chips)
        console.log('pot: ', game.pot)
    })
})
