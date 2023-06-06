import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import ContentWrapper from './ContentWrapper';
import '../css/AddBook.css';

const API_KEY = 'AIzaSyBNZW4NF0E0ISmTN7HQbwaHL6aRB3QIpqQ';
// const API_KEY = 'AIzaSyCQLHEacmhWROPybqvUY6B1lGYo0i2VoAA'; //Asta

const AddBook = ({updateBookData}) => {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [manualAdd, setManualAdd] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualAuthor, setManualAuthor] = useState('');
  const [manualISBN, setManualISBN] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [manualCoverFile, setManualCoverFile] = useState(null);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    
 
    let fullUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${API_KEY}`
    try {
      const response = await fetch(
        fullUrl
        // `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchInput}&key=${API_KEY}`  //Asta - added isbn: api requires it
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(fullUrl)
      console.log("data", data);
      const booksData = data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        isbn: item.volumeInfo.industryIdentifiers
          ? item.volumeInfo.industryIdentifiers[0].identifier
          : 'N/A',
        description: item.volumeInfo.description || 'N/A',
        // response.items[0].volumeInfo.imageLinks.thumbnail
        coverUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
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
  
  const handleAddBook = () => {
    if (manualAdd) {
      const inputCount = [manualTitle, manualAuthor, manualISBN, manualDescription,manualCoverFile].filter(Boolean).length;
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
        manualCoverFile: manualCoverFile ? URL.createObjectURL(manualCoverFile) : 'N/A',
      };
      const bookExists = books.some((book) => book.id === manualBook.id);
      if (bookExists) {
        toast.error('Book already exists');
        return;
      }
      updateBookData(manualBook);
      setSearchInput('');
      setBooks([]);
      setSelectedBookId('');
      setShowResults(false);
      setManualTitle('');
      setManualAuthor('');
      setManualISBN('');
      setManualDescription('');
      setManualCoverFile('');
      toast.success('Book added!');
    } else {
      const selectedBook = books.find((book) => book.id === selectedBookId);
      if (selectedBook) {
        //const bookExists = books.some((book) => book.id === selectedBook.id);
       /*  if (bookExists) {
          toast.error('Book already exists');
          return;
        } */
        console.log("selectedBook", selectedBook);
        updateBookData(selectedBook);
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
    setManualCoverFile('');
  };

  return (
    <ContentWrapper pageTitle="Add New Book"> 
      <div className="add-book">
        <div className="row">
          <div className="col-8">
            
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
          <div className="col-4 search_button_container">
            <button className="btn-default" onClick={handleSearch}> 
              Search
            </button>
          </div>
        </div>
        {/* {showResults && (
          <div className="search-results-container mt-3" >
            {books.map((book) => (
              <div className="card mb-3" key={book.id} >
                
                <div className="card-body ">
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

                  <div>
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="book-thumbnail"
                    />
                  </div>
                  <p className="card-text">Author(s): {book.authors.join(", ")}</p>
                  <p className="card-text">ISBN: {book.isbn}</p>
                </div>
              </div>
            ))}
          </div>
        )} */}
                {showResults && (
          <div className="search_results_container " >
          {/* <div className="col-6 search-results_books_container"></div> */}
            <ul className="search_results_list">
              {books.map((book) => (
                <li key={book.id} >
                
                <div className="row">

                <div className="AddBook_image_container col-4 ">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="book-thumbnail"
                    />
                  </div>


                  <div className="form-check AddBook_radio_button_container col-6 ">
                    <input
                      type="radio"
                      className="form-check-input"
                      id={`radio-${book.id}`}
                      name="book"
                      value={book.id}
                      checked={selectedBookId === book.id}
                      onChange={handleRadioChange}
                    />

                  <div className="AddBook_book_info column">

                    <label className="form-check-label" htmlFor={`radio-${book.id}`}>
                      {book.title}
                    </label>

                    <p className="card-text">Author(s): {book.authors.join(", ")}</p>
                    <p className="card-text">ISBN: {book.isbn}</p>

                  </div>
                  </div>
                 

                </div>
                  
              </li>
            
            ))}
            </ul>
          
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
              onChange={(e) => setManualCoverFile(e.target.files[0])} />
            </div>
          </div>
        )}
        <div className="row mt-3">
          <div className="col">
            <button
              className="btn-default "
              onClick={handleAddBook}
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
