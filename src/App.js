import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import BooksOnLoan from './components/BooksOnLoan';
import DataHandleService from './service/DataHandleService';
import AddBook from './components/AddBook';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faStar, faBookOpenReader, faCircleXmark, faMagnifyingGlassArrowRight} from '@fortawesome/free-solid-svg-icons';
import Spinner from './components/Spinner';


library.add(faEllipsis, faStar, faBookOpenReader, faCircleXmark, faMagnifyingGlassArrowRight);

function App() {

  const [bookData, setBookData] = useState([]);

  // Grabs the book data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const service = new DataHandleService();
        const data = await service.fetchData();
        setBookData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    console.log("bookData: " + JSON.stringify(bookData));
  }, [bookData]);

  // Update the book library 
  const updateBookData = (updatedBook) => {
    console.log("run updateBookData", updatedBook);
    const bookIndex = bookData.findIndex((book) => book.id === updatedBook.id);
    if (bookIndex !== -1) {
      const updatedList = [...bookData];
      updatedList[bookIndex] = updatedBook;
      setBookData(updatedList);
    }else{
      const newBook = {
        "id": updatedBook.id,
        "title": updatedBook.title,
        "author": updatedBook.authors,
        "ISBN": updatedBook.ISBN,
        "description": updatedBook.description,
        "cover": updatedBook.coverUrl,
        "onLoan": false,
        "read":false,
        "ratings":0,
        "opinion":"",
        "borrower":"",
        "date_of_borrow":""
      }
      const NewBookList = [...bookData,newBook ];
      setBookData(NewBookList);

    }
  }

  const removeBook_in_lib=(book_remove) => {
    const updatedBookList = bookData.filter((book) => book.id !== book_remove.id);
    setBookData(updatedBookList);
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/"
        element={bookData.length > 0 ? <Home data={bookData} updateBookData = {updateBookData} removeBook={removeBook_in_lib}/> : <Spinner/>}
          />
          <Route path="BooksOnLoan" element={<BooksOnLoan data={bookData} updateBookData = {updateBookData} />} />
          <Route path="AddBook" element={<AddBook updateBookData={updateBookData} />} />


        </Routes>
      </div>
    </Router>
  )
}

export default App;
