const db = require('../db/queries');

async function getHomePage(req, res) {
    const games = await db.getAllGames();
    const genres = await db.getAllGenres();
    res.render('index', {
        title: 'Home',
        games,
        genres
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


async function showSelectedGenre(req, res) {

}
module.exports = {
    getHomePage,
    showNewGameForm,
    showUpdateGameForm,
    postGame,
    updateGame,
    deleteGame,
    showSelectedGenre
}