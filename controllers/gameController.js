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
    const { game_title, img_src, genres, new_genre, devs, new_dev_first, new_dev_last } = req.body
    // Insert game/get game ID
    const gameId = await db.insertGame(game_title, img_src);
    // Process genres
    const genreIds = [].concat(genres || []);
    if (new_genre !== "") {
        const newId = await db.insertGenre(new_genre.trim());
        genreIds.push(newId)
    }
    // Process devs
    const devIds = [].concat(devs || []);
    if (new_dev_first !== "" && new_dev_last !== "") {
        const newId = await db.insertDeveloper(new_dev_first.trim(), new_dev_last.trim());
        devIds.push(newId)
    }
    // Link everything up
    genreIds.map(id => db.linkGameGenre(gameId, id));
    devIds.map(id => db.linkGameDeveloper(gameId, id));

    res.redirect('/');
}

async function showUpdateGameForm(req, res) {

}


async function updateGame(req, res) {

}

async function deleteGame(req, res) {
    const { game_title } = req.query;
    console.log(game_title)
    await db.deleteGame(game_title);
    res.redirect('/');
}

async function deleteGenre(req, res) {
    const { genreTitle } = req.query;

    const orphanedGames = await db.checkGamesWithGenre(genreTitle);

    if (orphanedGames.length > 0) {
        const games = await db.getGamesByGenre(genreTitle);
        const errors = [
            {
                msg: `Error: Cannot delete. ${orphanedGames.length} game(s) would be left without a genre.`
            }
        ];
        return res.status(400).render('genre', {
            title: genreTitle,
            games,
            errors: errors
        });
    }

    await db.deleteGenre(genreTitle);
    res.redirect('/');
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
    showGamesInSelectedGEnre,
    deleteGenre
}