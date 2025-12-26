const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query('SELECT id, title, cover_src FROM games');
    console.log(rows)
    return rows;
};

module.exports = {
    getAllGames
}