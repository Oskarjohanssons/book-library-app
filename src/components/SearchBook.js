import React, { useState } from 'react';
import { searchBooks, deleteBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import '../CSS/SearchBook.css';

function SearchBook() {
  const [word, setWord] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // För att hantera vald bok
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Söker efter böcker med titeln:", word);
      const response = await searchBooks(word);
      console.log("Sökresultat:", response);

      if (response && response.result) {
        setBooks(response.result);
      } else {
        setBooks([]);
        setError("No books found.");
      }
    } catch (err) {
      console.error("Fel vid sökning:", err);
      setError(err.response ? err.response.data.errorMessage[0] : 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book); // Öppna modalen med vald bok
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Stäng modalen
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.bookID !== id)); // Uppdatera listan utan att ladda om sidan
        handleCloseModal(); // Stäng modalen om boken raderas
      } catch (err) {
        setError('Failed to delete book');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-book/${id}`); // Navigera till uppdateringssidan för vald bok
  };

  return (
    <div>
      <h2>Search Books</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search by title..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.bookID} className="book-item" onClick={() => handleSelectBook(book)}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
            </div>
          ))
        ) : null}
      </div>

      {/* Modal för vald bok */}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedBook.title}</h3>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Genre:</strong> {selectedBook.genre}</p>
            <p><strong>Description:</strong> {selectedBook.description}</p>
            <div>
              <button onClick={() => handleUpdate(selectedBook.bookID)}>Update</button>
              <button className='delete-button' onClick={() => handleDelete(selectedBook.bookID)}>
              <i className="fas fa-trash-alt"></i>
              </button>
              <button className="modal-close" onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBook;





