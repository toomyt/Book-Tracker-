const Database = require('better-sqlite3');
const db = new Database('books.db');

db.exec(`
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'read'))
);
`);

module.exports = db;