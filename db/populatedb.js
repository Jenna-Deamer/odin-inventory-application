const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL
);

CREATE TABLE game_genres (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, genre_id)
);

CREATE TABLE game_developers (
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  developer_id INTEGER NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, developer_id)
);

INSERT INTO games (title)
VALUES 
('FFXIV'),
('World of Warcraft'),
('Hollow Knight'),
('Minecraft'),
('Baldur''s Gate 3');

INSERT INTO genres (title)
VALUES 
('MMORPG'),
('Adventure'),
('Fantasy'),
('Online'),
('Sandbox'),
('Platformer');

INSERT INTO developers (first_name, last_name)
VALUES
('Naoki', 'Yoshida'),     
('Jeff', 'Kaplan'),        
('Casey', 'Hunt'),        
('Markus', 'Persson'),    
('Swen', 'Vincke');

INSERT INTO game_genres (game_id, genre_id) VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(2, 4),
(3, 2),
(3, 6),
(4, 5),
(4, 2),
(5, 2),
(5, 3);

INSERT INTO game_developers (game_id, developer_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
