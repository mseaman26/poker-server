
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
        ]
        let game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.players.length).toBe(2)
        expect(game.turn).toBe(1)
        expect(game.dealer).toBe(0)
        game.fold()
        expect(game.dealer).toBe(1)
        expect(game.turn).toBe(0)
        expect(game.currentBet).toBe(100)
        game.bet(50)
        expect(game.players[0].moneyInPot).toBe(100)
        expect(game.players[1].chips).toBe(850)
        expect(game.players[1].moneyInPot).toBe(100)
        game.bet(850)
        expect(game.players[1].allIn).toBe(950)
        expect(game.round).toBe(0)
        game.bet(8.5)
        expect(game.round).toBe(0)
        game.nextFlip()
        expect(game.round).toBe(1)
        game.nextFlip()
        expect(game.round).toBe(2)
        game.nextFlip()
        expect(game.round).toBe(3)
        game.nextHand()






    })
   
})
