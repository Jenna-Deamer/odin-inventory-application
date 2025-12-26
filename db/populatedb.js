const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cover_src TEXT NOT NULL,
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
INSERT INTO games (title, cover_src)
VALUES 
(
  'FFXIV',
  'https://cdn11.bigcommerce.com/s-6rs11v9w2d/images/stencil/270x360/products/3100/16721/FFXIV_DT_Agnostic_Packshot_Standard_Edition_1000x1436_EN_v1__39320.1711384448.jpg'
),
(
  'World of Warcraft',
  'https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/iVAAAOSwP0JdcVlR/$_57.JPG?set_id=8800005007'
),
(
  'Hollow Knight',
  'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Hollow_Knight_first_cover_art.webp/274px-Hollow_Knight_first_cover_art.webp.png'
),
(
  'Minecraft', 'https://i.pinimg.com/736x/00/a8/e4/00a8e4a3edf9937c186dbecd009fd48d.jpg'
),
(
  'Baldur''s Gate 3',
  'https://upload.wikimedia.org/wikipedia/en/1/12/Baldur%27s_Gate_3_cover_art.jpg'
);

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
