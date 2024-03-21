
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
        ]
        const game = new Game(1, players, 0, 100, 1000)
        game.startGame()
        expect(game.turn).toBe(1)
        expect(game.flop.length).toBe(0)
        expect(game.players[1].pocket.length).toBe(2)
        expect(game.pot).toBe(150)
        //round 0
        game.bet(50) //1
        expect(game.round).toBe(0)
        game.bet(0) //0
        expect(game.round).toBe(1)

        //round 1
        expect(game.flop.length).toBe(3)
        expect(game.turn).toBe(1)
        game.bet(900) //1
        game.bet(900) //0
        expect(game.round).toBe(3)
        console.log('flop: ', game.flop)
        console.log('player 0 pocket: ', game.players[0].pocket)
        console.log('player 1 pocket: ', game.players[1].pocket)
        console.log('game players: ', game.players)
        


       


    })
})
