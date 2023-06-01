import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import BooksOnLoan from './components/BooksOnLoan';
import 'bootstrap/dist/css/bootstrap.css';



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
  )
}

export default App;
