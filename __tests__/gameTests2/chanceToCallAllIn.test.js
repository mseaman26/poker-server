
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
    test.skip('should return a new game', () => {
        const game = new Game()
        expect(game).toBeInstanceOf(Game)

    })
    
    test.skip('should return a new game with a roomId', () => {
        const game = new Game(1)
        expect(game.roomId).toBe(1)
    })

    test('makes sure nextRound behaves properly when round advances due fold', () => {
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
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.players.length).toBe(3)
        expect(game.deck.deck.length).toBe(46)
        expect(game.turn).toBe(0)
        expect(game.round).toBe(0)
        game.bet(100)//0
        game.bet(50)//1
        expect(game.round).toBe(0)
        game.bet(0)//2
        expect(game.round).toBe(1)
        //round1
        game.bet(70) //1
        game.fold()  //2
        expect(game.round).toBe(1)
        game.bet(70) //0
        expect(game.round).toBe(2)
        expect(game.turn).toBe(1)
        game.bet(10) //1
        //skip 2
        expect(game.round).toBe(2)
        expect(game.turn).toBe(0)
        game.fold() //0
        game.nextHand()
        expect(game.round).toBe(0)
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(1)
        expect(game.players[2].moneyInPot).toBe(50)
        expect(game.currentBet).toBe(100)

    })

    test('makes sure nextRound behaves properly when round advances due to square pot', () => {
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
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.players.length).toBe(3)
        expect(game.deck.deck.length).toBe(46)
        expect(game.turn).toBe(0)
        expect(game.round).toBe(0)
        //new chip amounts
       
        expect(game.checktotals()).toBe(true)
        game.bet(100)//0
        game.bet(50)//1
        expect(game.round).toBe(0)
        game.bet(0)//2
        expect(game.round).toBe(1)
        //round1
        game.bet(70) //1
        game.fold()  //2
        expect(game.round).toBe(1)
        game.bet(70) //0
        expect(game.round).toBe(2)
        //round 2
        game.bet(10) //1
        //skip 1
        expect(game.round).toBe(2)
        game.bet(10)
        expect(game.round).toBe(3)
        //round 3
        game.bet(0)
        expect(game.round).toBe(3)
        game.bet(0)
        game.nextHand()
        expect(game.round).toBe(0)
        expect(game.currentBet).toBe(100)

    })
    test('makes sure non all in player gets a chance to call final all in bet', () => {
        const players = [
            {
                id: 0,
                username: 'test0',    
            },
            {
                id: 1,
                username: 'test1',    
            },
        ]
        const game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.dealer).toBe(0)
        expect(game.turn).toBe(1)
        expect(game.round).toBe(0)
        //round 0
        game.bet(50)//1
        expect(game.round).toBe(0)
        game.bet(0)//0
        expect(game.round).toBe(1)
        expect(game.turn).toBe(1)
        //round 1
        game.bet(500)//1
        expect(game.round).toBe(1)
        game.bet(500)//0
        expect(game.round).toBe(2)
        expect(game.turn).toBe(1)
        //round 2
        game.bet(1)//1
        expect(game.round).toBe(2)
        game.fold()//0
        game.nextHand()
        expect(game.round).toBe(0)
        expect(game.turn).toBe(0)
        //chips after blinds
        expect(game.players[0].chips).toBe(350) //small blinds
        expect(game.players[1].chips).toBe(1500) //big blinds
        expect(game.checktotals()).toBe(true)
        expect(game.turn).toBe(0)
        //round 0
        game.bet(350)//0  All in
        // expect(game.turn).toBe(1)
        expect(game.round).toBe(0)




    })
   
})
