import React, { useState, useEffect } from 'react';
import ContentWrapper from './ContentWrapper';
import '../css/BooksOnLoan.css';
import borrowedBooks from '../data/borrowedBookList.json';

const BooksOnLoan = () => {

  //const borrBooks = borrowedBooks;
  const [rows, setRows] = useState(borrowedBooks);
  

  useEffect(() => {
    // Function to save JSON data to object storage
    const saveDataToObjectStorage = async () => {
      try {
        await saveToStorage(borrowedBooks); 
        console.log('Data saved to object storage.');
      } catch (error) {
        console.error('Error saving data to object storage:', error);
      }
    };
    saveDataToObjectStorage();
  }, []);

  const returnedBook = (id) => {
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
    saveToStorage(updatedRows);
    // update  the main library data
  };

  const saveToStorage=(jsonData)=>{
    localStorage.setItem("borrBooks",JSON.stringify(jsonData));
  }

  return (
  <ContentWrapper pageTitle="Books On Loan">
      <div className="booksOnLoan_borrowed_books">
          <ul className="booksOnLoan_borrowedBooksList">
          {rows.map(row => (
            <li key={row.id}>
              <div className="booksOnLoan_image_holder column">
                <img src={row.cover} alt={row.title} />
              </div>
              <div className="booksOnLoan_book_info column">
                <p className="booksOnLoan_title">{row.title}</p>
                <p className="booksOnLoan_author">{row.author}</p>
                <div className="booksOnLoan_date_borrow"><span>Date of borrow</span>{row.date_of_borrow}</div>
              </div>
              <button type="button" className="btn-default" onClick={() =>returnedBook(row.id)}>Returned</button>
            </li>
          ))}   
          </ul>

      </div>
  </ContentWrapper> 
  )
}

export default BooksOnLoan