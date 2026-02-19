const express = require('express');
const app = express();
const db = require('./database');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Book Tracker API!');
});

app.get('/books', (req, res) => {
    const books = db.prepare('SELECT * FROM books').all();
    res.json(books);
});

app.post('/books', (req,res) => {
    const { title, author, status } = req.body;
    const stmt = db.prepare('INSERT INTO books (title, author, status) VALUES (?,?,?)');
    const result = stmt.run(title, author, status);
    res.json({ id: result.lastInsertRowid, title, author, status });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

