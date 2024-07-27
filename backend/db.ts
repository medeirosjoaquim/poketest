import Database from "better-sqlite3";

const db = new Database("pokemons.db", { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS pokemon_cache (
    page INTEGER,
    items_per_page INTEGER,
    data TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (page, items_per_page)
  );
`);

export default db;
