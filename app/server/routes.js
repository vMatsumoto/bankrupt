import gameController from '~/server/controllers/game-controller'

export default (server) => {
    server.get('/ping', (req, res) => res.send(200, 'pong'));

    server.get('/run', gameController.runMultipleMatches);
}