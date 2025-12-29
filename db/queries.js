const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query(`SELECT 
   games.id, games.title, games.cover_src,
   string_agg(DISTINCT concat(developers.first_name, ' ', developers.last_name), ', ') AS devs,
   string_agg(DISTINCT genres.title, ', ') AS genres
FROM games 
JOIN game_developers ON games.id = game_developers.game_id
JOIN developers ON game_developers.developer_id = developers.id
JOIN game_genres ON games.id = game_genres.game_id
JOIN genres ON game_genres.genre_id = genres.id
GROUP BY games.id;`);
    console.log(rows)
    return rows;
};

async function getAllGenres() {
    const { rows } = await pool.query(`SELECT id, title AS genre FROM genres;`)
    return rows;
}
async function getAllDevs() {
    const { rows } = await pool.query(`
        SELECT 
            id, 
            concat(first_name, ' ', last_name) AS name 
        FROM developers 
        ORDER BY first_name ASC;
    `);
    return rows;
}
async function getGamesByGenre(selectedGenre) {
    const { rows } = await pool.query(`
        SELECT 
            games.id, 
            games.title,
            string_agg(DISTINCT genres.title, ', ') AS genres
        FROM games
        JOIN game_genres ON games.id = game_genres.game_id 
        JOIN genres ON game_genres.genre_id = genres.id
        WHERE genres.title ILIKE $1
        GROUP BY games.id;
    `, [selectedGenre]);

    return rows;
}
async function insertGame(title, img) {
    const { rows } = await pool.query(
        `INSERT INTO games (title, cover_src) 
         VALUES ($1, $2) 
         ON CONFLICT (title) DO UPDATE SET title=EXCLUDED.title 
         RETURNING id`,
        [title, img]
    );
    return rows[0].id;
}

async function insertDeveloper(first_name, last_name) {
    const { rows } = await pool.query(
        `INSERT INTO developers (first_name, last_name) 
         VALUES ($1, $2) 
         ON CONFLICT (first_name, last_name) 
         DO UPDATE SET first_name = EXCLUDED.first_name 
         RETURNING id`,
        [first_name, last_name]
    );
    return rows[0].id;
}

async function insertGenre(genre_title) {
    const { rows } = await pool.query(
        `INSERT INTO genres (title) 
         VALUES ($1) 
         ON CONFLICT (title) 
         DO UPDATE SET title = EXCLUDED.title
         RETURNING id`,
        [genre_title]
    );
    return rows[0].id;
}

async function linkGameGenre(gameId, genreId) {
    await pool.query(
        `INSERT INTO game_genres (game_id, genre_id) 
         VALUES ($1, $2) 
         ON CONFLICT DO NOTHING`,
        [gameId, genreId]
    );
}

async function linkGameDeveloper(gameId, devId) {
    await pool.query(
        `INSERT INTO game_developers (game_id, developer_id) 
         VALUES ($1, $2) 
         ON CONFLICT DO NOTHING`,
        [gameId, devId]
    );
}

async function checkGamesWithGenre(genre_title) {
    const { rows } = await pool.query(`
      SELECT g.game_id 
        FROM game_genres g
        JOIN genres ON g.genre_id = genres.id
        WHERE genres.title = $1
        AND g.game_id IN (
            SELECT game_id 
            FROM game_genres 
            GROUP BY game_id 
            HAVING COUNT(genre_id) = 1
        )
    `, [genre_title]);

    return rows;
}

async function deleteGenre(genre_title) {
    await pool.query(`DELETE FROM genres WHERE title = $1`, [genre_title]);
}

async function deleteGame(game_title) {
    await pool.query(`DELETE FROM games WHERE title = $1`, [game_title]);

}
module.exports = {
    getAllGames,
    getAllGenres,
    getGamesByGenre,
    getAllDevs,
    insertGame,
    insertDeveloper,
    insertGenre,
    linkGameGenre,
    linkGameDeveloper,
    checkGamesWithGenre,
    deleteGenre,
    deleteGame
}