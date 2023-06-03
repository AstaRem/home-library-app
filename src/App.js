import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import BooksOnLoan from './components/BooksOnLoan';
import DataHandleService from './service/DataHandleService';
//import AddNewBook from './components/AddNewBook';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis} from '@fortawesome/free-solid-svg-icons';
import Spinner from './components/Spinner';


library.add(faEllipsis);


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


  return (
    <Router>
      <div>
        <Header />
        <Routes>
        <Route path="/"
        element={bookData.length > 0 ? <Home data={bookData} /> : <Spinner/>}
          />
          <Route path="BooksOnLoan" element={<BooksOnLoan />} />
          {/* <Route path="AddNewBook" element={<AddNewBook />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App;
