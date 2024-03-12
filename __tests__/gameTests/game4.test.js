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
        

        // new chip amounts
        game.players[0].chips = 5
        game.players[1].chips = 66
        game.players[2].chips = 260
        game.players[3].chips = 80
        game.players[4].chips = 39

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
        game.turn = 0

        let betSum = 0
        let chipsSum = 0
        for(let i = 0; i < game.players.length; i++){
            betSum += players[i].bet
        }
        for(let i = 0; i < game.players.length; i++){
            chipsSum += players[i].chips
        }
        expect(betSum).toBe(0)
        expect(betSum + chipsSum + game.pot).toBe(450)

    })
})
