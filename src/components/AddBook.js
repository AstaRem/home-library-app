import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import ContentWrapper from './ContentWrapper';
import '../css/AddBook.css';

// const API_KEY = 'AIzaSyBNZW4NF0E0ISmTN7HQbwaHL6aRB3QIpqQ';
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
    
    const baseApiUrl = 'https://www.googleapis.com/books/v1/volumes';
    const apiKey = 'AIzaSyBNZW4NF0E0ISmTN7HQbwaHL6aRB3QIpqQ';
 
    try {
      const isbnUrl = `${baseApiUrl}?q=isbn:${searchInput}&key=${apiKey}`;
      const titleUrl = `${baseApiUrl}?q=intitle:${searchInput}&key=${apiKey}`;
      const authorUrl = `${baseApiUrl}?q=inauthor:${searchInput}&key=${apiKey}`;


      const [isbnResponse, titleResponse, authorResponse] = await Promise.all([
        fetch(isbnUrl),
        fetch(titleUrl),
        fetch(authorUrl),
      ]);

      if (!isbnResponse.ok || !titleResponse.ok || !authorResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const [isbnData, titleData, authorData] = await Promise.all([
        isbnResponse.json(),
        titleResponse.json(),
        authorResponse.json(),
      ]);

      const booksData = [
        ...showBooksData(isbnData),
        ...showBooksData(titleData),
        ...showBooksData(authorData),
      ];

      setBooks(booksData);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showBooksData = (data) => {
    if (!data.items) {
      return [];
    }
  
    return data.items.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      isbn: item.volumeInfo.industryIdentifiers
        ? item.volumeInfo.industryIdentifiers[0].identifier
        : 'N/A',
      description: item.volumeInfo.description || 'N/A',
      coverUrl:
        item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
          ? item.volumeInfo.imageLinks.thumbnail
          : 'N/A',
    }));
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
          <div className="col-8 search_input_wrapper">
            
              <input
                type="radio"
                className="form-check-input position-static"
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
                {showResults && (
          <div className="search_results_container " >
            <ul className="search_results_list">
              {books.map((book) => (
                <li key={book.id} >
                
                <div className="row book_row">

                <div className="AddBook_image_container col-sm-4 col-md-2">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="book-thumbnail"
                    />
                  </div>

                  <div className="form-check AddBook_radio_button_container col-sm-8 col-md-10">
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
  className="form-check-input position-static"
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
<label class="form-check-label" htmlFor="manual-radio">
          Add Manually
        </label>     
          </div>
          <div className="col"></div>
        </div>
        {manualAdd && (
          <div className="manual-add-container mt-3">
            <form>
  <div className="form-group row">
    <label htmlFor="manual-title" className="col-sm-2 col-form-label">Title</label>
    <div className="col-sm-10">
      <input
        className="form-control"
        type="text"
        id="manual-title"
        value={manualTitle}
        onChange={(e) => setManualTitle(e.target.value)}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="manual-author" className="col-sm-2 col-form-label">Author</label>
    <div className="col-sm-10">
      <input
        className="form-control"
        type="text"
        id="manual-author"
        value={manualAuthor}
        onChange={(e) => setManualAuthor(e.target.value)}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="manual-isbn" className="col-sm-2 col-form-label">ISBN</label>
    <div className="col-sm-10">
      <input
        className="form-control"
        type="text"
        id="manual-isbn"
        value={manualISBN}
        onChange={(e) => setManualISBN(e.target.value)}
      />
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="manual-description" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
      <textarea
        className="form-control"
        id="manual-description"
        rows="3"
        value={manualDescription}
        onChange={(e) => setManualDescription(e.target.value)}
      ></textarea>
    </div>
  </div>

  <div className="form-group row">
    <label htmlFor="manual-upload" className="col-sm-2 col-form-label">Upload Book Cover:</label>
    <div className="col-sm-10">
      <input
        type="file"
        className="form-control-file"
        id="manual-upload"
        onChange={(e) => setManualCoverFile(e.target.files[0])}
      />
    </div>
  </div>
</form>

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
