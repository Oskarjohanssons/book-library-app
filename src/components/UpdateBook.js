import React, { useState, useEffect } from 'react';
import { getBookById, updateBook } from '../services/bookService';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function UpdateBook() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState(''); // Lägg till description state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const genres = [
    'Horror',
    'Thriller',
    'Fantasy',
    'Romance',
    'Mystery',
    'Classic',
    'Dystopian',
    'Adventure',
    'Historical'
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(id);
        setTitle(book.result.title);
        setAuthor(book.result.author);
        setGenre(book.result.genre);
        setDescription(book.result.description); // Fyll i description
      } catch (err) {
        setError('Failed to fetch book data.');
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Lägg till description i bookData
    const bookData = { bookID: id, title, author, genre, description };

    try {
      await updateBook(bookData);
      navigate('/');
    } catch (err) {
      setError('Failed to update book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book title"
            required
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author name"
            required
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)} // Hanterar genreval
            required
          >
            <option value="">Select a genre</option> {/* Förvalt alternativ */}
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description</label> {/* Nytt fält för description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Book description"
            required
          />
        </div>
        <button type="submit" className='button' disabled={loading}>
          {loading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UpdateBook;



