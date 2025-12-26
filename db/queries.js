const pool = require("./pool");

async function getAllGames() {
    const { rows } = await pool.query('SELECT id, title FROM games');
    console.log(rows)
    return rows;
};

module.exports = {
    getAllGames
}