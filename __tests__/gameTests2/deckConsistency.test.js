
import {Game} from '../../handlers/Game.js'
import { deck2_1, deck3_1, deck3_2} from '../../handlers/fixedDecks.js'

function hasDuplicates(array) {
    const seen = new Set();
    for (const item of array) {
      const cardKey = JSON.stringify(item);
      if (seen.has(cardKey)) {
        return true; // Duplicate found
      }
      seen.add(cardKey);
    }
    return false; // No duplicates found
}

describe('Game', () => {
    test('should return a new game', () => {
        console.log('come on')
        const game = new Game()
        expect(game).toBeInstanceOf(Game)

    })
    
    test('should return a new game with a roomId', () => {
        const game = new Game(1)
        expect(game.roomId).toBe(1)
    })

    test('checks for deck length consistency and no duplicates', () => {
        console.log('for fucks sake')
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
        game.startGame()
        expect(game.players.length).toBe(2)
        expect(game.deck.deck.length).toBe(48)
        expect(game.turn).toBe(1)
        expect(game.round).toBe(0)
        game.bet(50)//1]
        expect(game.round).toBe(0)
        //next player bet
        game.bet(0)
        expect(game.round).toBe(1)
        expect(game.deck.deck.length).toBe(45)
        game.bet(40) //1
        expect(game.round).toBe(1)
        game.bet(40) //0
        expect(game.round).toBe(2)
        expect(game.deck.deck.length).toBe(44)
        game.bet(0) // 1
        expect(game.round).toBe(2)
        game.bet(0) //0
        expect(game.round).toBe(3)
        expect(game.deck.deck.length).toBe(43)
        game.bet(0) //1
        expect(game.round).toBe(3)
        game.bet(0) //0



        expect(game.round).toBe(0)
        expect(game.deck.deck.length).toBe(48)
        expect(hasDuplicates(game.deck.deck)).toBe(false)
        expect(game.checktotals()).toBe(true)
        expect(game.dealer).toBe(1)
        expect(game.round).toBe(0)
        //round 0

        game.bet(50)//0
        expect(game.round).toBe(0)
        game.bet(0)//1
       
        //round 1
        game.bet(0)//0
        expect(game.round).toBe(1)
        game.bet(0)//1
        expect(game.round).toBe(2)
        
        //round 2
        game.bet(0)//0
        expect(game.round).toBe(2)
        game.bet(0)//1
        expect(game.round).toBe(3)

        expect(game.deck.deck.length).toBe(43)
        game.bet(0)//0
        expect(game.round).toBe(3)
        game.bet(0)//1
        expect(game.round).toBe(0)
        expect(game.deck.deck.length).toBe(48)
        expect(hasDuplicates(game.deck.deck)).toBe(false)

        
        

    })
    test('checks with a 5 player game for deck length consistency and no duplicates', () => {
        console.log('for fucks sake')
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
                username: 'test2'
            },
            {
                id: 3,
                username: 'test3'
            },
            {
                id: 4,
                username: 'test4'
            }
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.players.length).toBe(5)
        expect(game.deck.deck.length).toBe(42)
        expect(game.turn).toBe(3)
        expect(game.round).toBe(0)
        game.bet(100) //3
        game.bet(100)// 4
        game.bet(100) //0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0)
        expect(game.round).toBe(1)
        //round 1
        expect(game.turn).toBe(1)
        expect(game.deck.deck.length).toBe(39)
        game.bet(100)
        game.bet(100)
        game.bet(100)
        game.bet(100)
        expect(game.round).toBe(1)
        game.bet(100)
        //next player bet
        expect(game.deck.deck.length).toBe(38)
        expect(game.round).toBe(2)
        game.bet(40)
        game.bet(40)
        game.bet(40)
        game.bet(40)
        expect(game.round).toBe(2)
        game.bet(40)
        expect(game.round).toBe(3)
        expect(game.deck.deck.length).toBe(37)
        expect(game.turn).toBe(1)
        game.bet(0) 
        game.bet(0) 
        game.bet(0) 
        game.bet(0) 
        expect(game.round).toBe(3)
        game.bet(0) 
        expect(game.deck.deck.length).toBe(42)
        expect(hasDuplicates(game.deck.deck)).toBe(false)  
        game.deck.deck[0] = game.deck.deck[1]
        expect(hasDuplicates(game.deck.deck)).toBe(true)  


    })
})
