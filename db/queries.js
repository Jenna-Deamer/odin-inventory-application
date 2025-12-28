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
module.exports = {
    getAllGames,
    getAllGenres,
    getGamesByGenre,
    getAllDevs
}