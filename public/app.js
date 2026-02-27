let editingBookId = null; 

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Status: ${book.status}</p>
            <button id="delete-${book.id}">Delete</button>
            <button id="edit-${book.id}">Edit</button>
        `;

        div.querySelector(`#delete-${book.id}`).addEventListener('click', async () => {
            await fetch(`/books/${book.id}`, { method: 'DELETE' });
            fetchBooks();
        });
        div.querySelector(`#edit-${book.id}`).addEventListener('click', async () => {
            editingBookId = book.id;
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('status').value = book.status;
            document.querySelector('button[type="submit"]').textContent = 'Update Book';
        });
        bookList.appendChild(div);
    });
}

const addBookForm = document.getElementById('book-form');
addBookForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    if (editingBookId === null) {
        await fetch('/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, status })
        }); 
    } else {
        await fetch(`/books/${editingBookId}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ title, author, status})
        });
        editingBookId = null;
        document.querySelector('button[type="submit"]').textContent = 'Add Book';
    }
    fetchBooks();
    addBookForm.reset();
});

async function fetchBooks() {
    const response = await fetch('/books');
    const books = await response.json();
    displayBooks(books);
}
fetchBooks();

