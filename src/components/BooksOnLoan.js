import React, { useState, useEffect } from 'react';
import ContentWrapper from './ContentWrapper';
import '../css/BooksOnLoan.css';

const BooksOnLoan = (props) => {


  //const [rows, setRows] = useState(borrowedBooks);
  const [borrowedbookList, setborrowedbookList] = useState([]);

  // Set ithe nitial date value in the input field
  useEffect(() => {
    if (props.data !== null){
      //Filter out which book(s) are on loan
      const borrBooks = props.data.filter(book => book.onloan === true);
      setborrowedbookList(borrBooks);
    }
  },[props.data]);
  
 // keep track of bookList
 useEffect(() => {
  console.log("borrowedbookList:", borrowedbookList);
 }, [borrowedbookList]);

  const returnedBook = (returnedBook) => {
    const updateReturnedbook = {
      ...returnedBook,
      onloan:false,
      date_of_borrow:"",
      borrower:""
    }
    props.updateBookData(updateReturnedbook);
  };

  return (
  <ContentWrapper pageTitle="Books On Loan">
      <div className="booksOnLoan_borrowed_books">
          <ul className="booksOnLoan_borrowedBooksList">
          {borrowedbookList.map(book => (
            <li key={book.id}>
              <div className="booksOnLoan_image_holder column">
                <img src={book.cover} alt={book.title} />
              </div>
              <div className="booksOnLoan_book_info column">
                <p className="booksOnLoan_title">{book.title}</p>
                <p className="booksOnLoan_author">{book.author}</p>
                <div className="booksOnLoan_date_borrow"><span>Date of borrow</span>{book.date_of_borrow}</div>
              </div>
              <button type="button" className="btn-default" onClick={() =>returnedBook(book)}>Returned</button>
            </li>
          ))}   
          </ul>

      </div>
  </ContentWrapper> 
  )
}

export default BooksOnLoan