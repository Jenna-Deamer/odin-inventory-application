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
    const { rows } = await pool.query(`SELECT title AS genre FROM genres;`)
    console.log('Fetching genres')
    console.log(rows)
    return rows;
}
module.exports = {
    getAllGames,
    getAllGenres
}