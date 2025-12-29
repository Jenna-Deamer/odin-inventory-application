const { Router } = require('express');
const gameController = require('../controllers/gameController');
const gameRouter = Router();

gameRouter.get('/', gameController.getHomePage);
gameRouter.get('/genres/:genreName', gameController.showGamesInSelectedGEnre);
gameRouter.get('/new', gameController.showNewGameForm);
gameRouter.post('/new', gameController.postGame);
gameRouter.get('/delete-genre', gameController.deleteGenre)
gameRouter.get('/delete-game', gameController.deleteGame)


module.exports = gameRouter;