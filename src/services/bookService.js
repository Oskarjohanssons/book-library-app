import axios from 'axios';

const API_BASE_URL = 'https://localhost:7224/api';

// Hämta alla böcker
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Skapa ny bok
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/book`, bookData);
    return response.data; 
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// Hämta bok med ID
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

// Uppdatera en bok
export const updateBook = async (bookData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/book`, bookData);
    return response.data; 
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};


export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/book/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};

// Sök böcker med ett specifikt sökord
export const searchBooks = async (word) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/search/${word}`);
    return response.data; // Returnerar resultaten av sökningen
  } catch (error) {
    console.error(`Error searching for books with word "${word}":`, error);
    throw error;
  }
};


