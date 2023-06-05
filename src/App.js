import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import BooksOnLoan from './components/BooksOnLoan';
import DataHandleService from './service/DataHandleService';
import AddBook from './components/AddBook';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis, faStar, faBookOpenReader} from '@fortawesome/free-solid-svg-icons';
import Spinner from './components/Spinner';


library.add(faEllipsis, faStar, faBookOpenReader);

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
    const bookIndex = bookData.findIndex((book) => book.id === updatedBook.id);
    if (bookIndex !== -1) {
      const updatedList = [...bookData];
      updatedList[bookIndex] = updatedBook;
      setBookData(updatedList);
    }
  }

  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/"
        element={bookData.length > 0 ? <Home data={bookData} updateBookData = {updateBookData} /> : <Spinner/>}
          />
          <Route path="BooksOnLoan" element={<BooksOnLoan />} />
      
          <Route path="AddBook" element={<AddBook />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App;
