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
    const genres = await db.getAllGenres();
    const devs = await db.getAllDevs();
    res.render('new', {
        genres,
        devs
    });
}

async function postGame(req, res) {

}

async function showUpdateGameForm(req, res) {

}


async function updateGame(req, res) {

}

async function deleteGame(req, res) {

}


async function showGamesInSelectedGEnre(req, res) {
    const selectedGenre = req.params.genreName;
    const games = await db.getGamesByGenre(selectedGenre);

    res.render('genre', {
        title: selectedGenre,
        games
    })
}
module.exports = {
    getHomePage,
    showNewGameForm,
    showUpdateGameForm,
    postGame,
    updateGame,
    deleteGame,
    showGamesInSelectedGEnre
}