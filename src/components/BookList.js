import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../services/bookService'; // Importera nödvändiga tjänster
import { useNavigate } from 'react-router-dom'; // För att navigera till uppdateringssidan

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null); // Tillstånd för vald bok
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // För att navigera vid uppdatering

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response.result);
      } catch (err) {
        setError('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
    navigate(`/update-book/${id}`); // Navigera till uppdateringsformuläret
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Book List</h2>
      <div className="book-grid">
        {books.map((book) => (
          <div
            key={book.bookID}
            className="book-card"
            onClick={() => handleSelectBook(book)}
          >
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>Genre: {book.genre}</p>
          </div>
        ))}
      </div>

      {/* Modal för att visa bokdetaljer när en bok är vald */}
      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedBook.title}</h3>
            <p>
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p>
              <strong>Genre:</strong> {selectedBook.genre}
            </p>
            <p>
              <strong>Description:</strong> {selectedBook.description}
            </p>
            <div>
              <button onClick={() => handleUpdate(selectedBook.bookID)}>
                Update
              </button>
              <button className='delete-button' onClick={() => handleDelete(selectedBook.bookID)}>
              <i className="fas fa-trash-alt"></i>
              </button>
              <button className="modal-close" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;




