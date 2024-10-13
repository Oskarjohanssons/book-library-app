import React, { useState, useEffect } from 'react';
import { getBookById, deleteBook } from '../services/bookService';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteBook() {
  const { id } = useParams(); // Hämta bok-ID från URL
  const [book, setBook] = useState(null); // Tillstånd för bokdata
  const [loading, setLoading] = useState(false); // Tillstånd för laddning
  const [error, setError] = useState(null); // Tillstånd för felmeddelanden
  const navigate = useNavigate(); // För att navigera till en annan sida

  useEffect(() => {
    // Hämtar bokdata när komponenten laddas
    const fetchBook = async () => {
      try {
        console.log(`Fetching book with ID: ${id}`);
        const response = await getBookById(id);
        setBook(response.result); // Sätter bokdata i tillståndet
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to fetch book data.');
      }
    };

    fetchBook(); // Anropas vid komponentens laddning
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${book.title}"?`); // Bekräfta radering
    if (!confirmed) return; // Avbryter om användaren inte bekräftar

    setLoading(true); // Startar laddning
    setError(null); // Nollställer fel

    try {
      console.log(`Attempting to delete book with ID: ${id}`);
      await deleteBook(id); // Anropa API för att radera bok
      console.log('Book deleted successfully.');
      navigate('/'); // Navigera tillbaka till startsidan efter radering
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book.'); // Visar felmeddelande om något går fel
    } finally {
      setLoading(false); // Avslutar laddning
    }
  };

  if (!book) return <p>Loading book data...</p>; // Visar laddningsmeddelande om bokdata inte finns ännu

  return (
    <div className="container">
      <h2>Delete Book</h2>
      <p>Are you sure you want to delete <strong>{book.title}</strong> by {book.author}?</p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Yes, Delete'}
      </button>
      <button onClick={() => navigate('/')}>Cancel</button>
      {error && <p className="error-message">{error}</p>} {/* Visar felmeddelanden */}
    </div>
  );
}

export default DeleteBook;





