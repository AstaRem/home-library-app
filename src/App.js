import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import BooksOnLoan from './components/BooksOnLoan';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis} from '@fortawesome/free-solid-svg-icons';

library.add(faEllipsis);

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
