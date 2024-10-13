import React, { useState } from 'react';
import { createBook } from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import '../CSS/AddBook.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState(''); // Nytt tillstånd för description
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Lägg till description i bokobjektet
    const bookData = { title, author, genre, description };

    try {
      await createBook(bookData);
      navigate('/');
    } catch (err) {
      setError('Failed to create book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book title"
            required
          />
        </div>
        <div className="form-group">
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
            onChange={(e) => setGenre(e.target.value)}
            required
          >
            <option value="">Select a genre</option> 
            {genres.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
        {/* Nytt fält för beskrivningen */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default BookForm;







