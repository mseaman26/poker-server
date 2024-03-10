import {Game} from '../../handlers/Game.js'

test('should return expected chip values after some betting', () => {
    const players = [
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
        }
    ]
    const game = new Game(1, players, 0, 100, 1000)
    game.startGame()
    game.bet(100) //3 
    game.bet(100)  //4
    game.bet(100)  //0 D
    game.bet(50)  //1
    expect(game.betIndex).toBe(3)
    game.bet(500) //2
    game.bet(500) //3
    game.bet(500) //4
    game.bet(500) //0 D
    game.bet(500) //1
    
    expect(game.round).toBe(1)
    expect(game.currentBet).toBe(0)

    
})