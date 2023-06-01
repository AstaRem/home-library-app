import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './components/Header';
import BooksOnLoan from './components/BooksOnLoan';
import Home from './components/Home';



function App() {
  return (

    <Router>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="BooksOnLoan" element={<BooksOnLoan />} />
      
      </Routes>
    </div>
  </Router>


  );
}






export default App;
