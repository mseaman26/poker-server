
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
        expect(game.turn).toBe(3)
        game.bet(100) //3
        game.bet(100) //4
        game.bet(100) //0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //2
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(100) //2
         //CHANGE BLINDS
        game.changeBlinds(300) 
        expect(game.bigBlind).toBe(100)
        expect(game.newBigBlind).toBe(300)
        game.bet(100) //3
        game.bet(100) //4
        expect(game.round).toBe(1)
        game.bet(100) //0
        expect(game.round).toBe(2)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(100) //2
        game.bet(100) //3
        game.bet(100) //4
        expect(game.round).toBe(2)
        game.bet(100) //0
        expect(game.round).toBe(3)
        expect(game.turn).toBe(1)
        game.bet(100) //1
        game.bet(100) //2
        game.bet(100) //3
        game.bet(100) //4
        expect(game.round).toBe(3)
        game.bet(100) //0
        expect(game.handComplete).toBe(true)
        game.deck.deck = [...deck2_1_1]
        //NEXT HAND
        game.nextHand()
        expect(game.handComplete).toBe(false)
        expect(game.deck.deck.length).toBe(42)
        expect(game.round).toBe(0)
        expect(game.turn).toBe(4)
        expect(game.bigBlind).toBe(300)
        expect(game.newBigBlind).toBe(null)
        game.bet(300) //4
        game.bet(300) //0
        game.bet(300) //1
        game.bet(150) //2
        expect(game.round).toBe(0)
        game.bet(0) //3
        expect(game.round).toBe(1)
        game.changeBlinds(99)
        expect(game.bigBlind).toBe(300)
        expect(game.newBigBlind).toBe(99)
        expect(game.turn).toBe(2)
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //0
        expect(game.round).toBe(1)
        game.bet(0) //1
        expect(game.round).toBe(2)
        expect(game.turn).toBe(2)
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //0
        expect(game.round).toBe(2)
        game.bet(0) //1
        expect(game.round).toBe(3)
        expect(game.turn).toBe(2)
        game.bet(0) //2
        game.bet(0) //3
        game.bet(0) //4
        game.bet(0) //0
        expect(game.round).toBe(3)
        game.bet(0) //1
        expect(game.handComplete).toBe(true)
        game.deck.deck = [...deck2_1_2]
        //NEXT HAND
        game.nextHand()
        expect(game.handComplete).toBe(false)
        expect(game.deck.deck.length).toBe(42)
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(2)
        expect(game.turn).toBe(0)
        expect(game.bigBlind).toBe(99)
        expect(game.newBigBlind).toBe(null)
        expect(game.currentBet).toBe(99)
        expect(game.players[3].bet).toBe(49)
        console.log('eliminated count', game.eliminatedCount)
        game.bet(99) //0
        game.bet(99) //1
        game.bet(99) //2
        game.bet(49) //3
        expect(game.turn).toBe(4)
        expect(game.round).toBe(0)
        game.bet(0) //4
        expect(game.round).toBe(1)






    })
})
