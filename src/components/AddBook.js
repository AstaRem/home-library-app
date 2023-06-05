import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import ContentWrapper from './ContentWrapper';
import '../css/AddBook.css';

const API_KEY = 'AIzaSyBNZW4NF0E0ISmTN7HQbwaHL6aRB3QIpqQ';

const AddBook = () => {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [manualAdd, setManualAdd] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualAuthor, setManualAuthor] = useState('');
  const [manualISBN, setManualISBN] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const booksData = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        isbn: item.volumeInfo.industryIdentifiers
          ? item.volumeInfo.industryIdentifiers[0].identifier
          : 'N/A',
        description: item.volumeInfo.description || 'N/A',
        coverUrl: item.volumeInfo.imageLinks
          ? item.volumeInfo.imageLinks.thumbnail
          : 'N/A',
      }));
      
      setBooks(booksData);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedBookId(event.target.value);
  };
  
  const handleAddToLocalStorage = () => {
    if (manualAdd) {
      const inputCount = [manualTitle, manualAuthor, manualISBN, manualDescription].filter(Boolean).length;
      if (inputCount === 0) {
        toast.error('Please provide at least one information');
        return;
      } }
  
    if (manualAdd) {
 
      const manualBook = {
        id: new Date().getTime().toString(),
        title: manualTitle || 'N/A',
        author: manualAuthor || 'N/A',
        isbn: manualISBN || 'N/A',
        description: manualDescription || 'N/A',
        coverFile: coverFile ? URL.createObjectURL(coverFile) : 'N/A',
      };
  
      const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
      savedBooks.push(manualBook);
      localStorage.setItem('books', JSON.stringify(savedBooks));
      setSearchInput('');
      setBooks([]);
      setSelectedBookId('');
      setShowResults(false);
      setManualTitle('');
      setManualAuthor('');
      setManualISBN('');
      setManualDescription('');
      toast.success('Book added!');
    } else {
      const selectedBook = books.find((book) => book.id === selectedBookId);
      if (selectedBook) {
        const savedBooks = JSON.parse(localStorage.getItem('books') || '[]');
        savedBooks.push(selectedBook);
        localStorage.setItem('books', JSON.stringify(savedBooks));
        setSearchInput('');
        setBooks([]);
        setSelectedBookId('');
        setShowResults(false);
        toast.success('Book added!');
      }
    }
  };  
  const handleCancel = () => {
    setSearchInput('');
    setBooks([]);
    setSelectedBookId('');
    setShowResults(false);
    setManualAdd(false);
    setManualTitle('');
    setManualAuthor('');
    setManualISBN('');
    setManualDescription('');
  };

  return (
    <ContentWrapper pageTitle="Add New Book"> 
      <div className="add-book">
        <div className="row">
          <div className="col">
            
              <input
                type="radio"
                className="form-check-input"
                id="radio-search"
                name="radio"
                value="search"
                checked={!manualAdd}
                onChange={() => setManualAdd(false)}
              />
            
            <input
              type="text"
              className="form-control"
              id="searchInput"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Book title, author or ISBN "
              disabled={manualAdd}
            />
          </div>
          <div className="col-auto">
            <button className="btn-default" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        {showResults && (
          <div className="search-results-container mt-3">
            {books.map((book) => (
              <div className="card mb-3" key={book.id}>
                <div className="card-body">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`radio-${book.id}`}
                      name="book"
                      value={book.id}
                      checked={selectedBookId === book.id}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor={`radio-${book.id}`}>
                      {book.title}
                    </label>
                  </div>
                  <p className="card-text">Author(s): {book.authors.join(", ")}</p>
                  <p className="card-text">ISBN: {book.isbn}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="row mt-3">
          <div className="col">
          <input
  type="radio"
  className="form-check-input"
  id="radio-manual"
  name="radio"
  value="manual"
  checked={manualAdd}
  onChange={() => {
    setManualAdd(true);
    setSearchInput('');
    setBooks([]);
    setSelectedBookId('');
    setShowResults(false);
  }}
/>   
            <h6>Add Manually</h6>
          </div>
          <div className="col"></div>
        </div>
        {manualAdd && (
          <div className="manual-add-container mt-3">
            <div className="form-group">
              <label htmlFor="manual-title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="manual-title"
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="manual-author">Author:</label>
              <input
                type="text"
                className="form-control"
                id="manual-author"
                value={manualAuthor}
                onChange={(e) => setManualAuthor(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="manual-isbn">ISBN:</label>
              <input
                type="text"
                className="form-control"
                id="manual-isbn"
                value={manualISBN}
                onChange={(e) => setManualISBN(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="manual-description">Description:</label>
              <textarea
                className="form-control"
                id="manual-description"
                rows="3"
                value={manualDescription}
                onChange={(e) => setManualDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="manual-upload">Upload book cover:</label>
              <input type="file" className="form-control-file" id="manual-upload"
              onChange={(e) => setCoverFile(e.target.files[0])} />
            </div>
          </div>
        )}
        <div className="row mt-3">
          <div className="col">
            <button
              className="btn-default "
              onClick={handleAddToLocalStorage}
              disabled={!selectedBookId && !manualAdd}>
              Add
            </button>
          </div>
          <div className="col">
            <button className="btn-default" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      </ContentWrapper>
  );
};

export default AddBook;
