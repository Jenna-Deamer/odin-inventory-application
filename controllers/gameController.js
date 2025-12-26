const db = require('../db/queries');

async function getGames(req, res) {
    const games = await db.getAllGames();
    res.render('index', {
        title: 'Home',
        games
    })
}

async function showNewGameForm(req, res) {

}

async function postGame(req, res) {

}

async function showUpdateGameForm(req, res) {

}


async function updateGame(req, res) {

}

async function deleteGame(req, res) {

}

module.exports = {
    getGames,
    showNewGameForm,
    showUpdateGameForm,
    postGame,
    updateGame,
    deleteGame
}