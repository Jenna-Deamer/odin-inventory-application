const { Router } = require('express');
const gameController = require('../controllers/gameController');
const gameRouter = Router();

gameRouter.get('/', gameController.getGames);
gameRouter.get('/new', gameController.showNewGameForm);
gameRouter.post('/new', gameController.postGame);

module.exports = gameRouter;