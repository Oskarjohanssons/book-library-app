import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import SearchBook from './components/SearchBook';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-book">Add Book</Link>
          </li>
          <li className="navbar-item">
            <Link to="/search-book">Search Books</Link>
          </li>
        </ul>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add-book" element={<BookForm />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/delete-book/:id" element={<DeleteBook />} />
          <Route path="/search-book" element={<SearchBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;





