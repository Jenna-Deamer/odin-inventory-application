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
    console.log("--- Form Submission Captured ---");
    console.log(req.body);
    console.log("-------------------------------");
    const { game_title, img_src, genres, new_genre, devs, new_dev_first, new_dev_last } = req.body
    // Insert game
    await db.insertGame(game_title, img_src);
    // Handle new devs & genres

    // Link bridge tables
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