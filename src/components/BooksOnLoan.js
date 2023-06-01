import React, { useState } from 'react';
import ContentWrapper from './ContentWrapper';
import '../css/BooksOnLoan.css';

const BooksOnLoan = () => {

  const borrowedBooks = [
    {
      "id":1,
      "title": "Hack Your Hormones",
      "author": "Davinia Taylor",
      "cover": "https://books.google.com/books/content?id=LdQtzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      "date_of_borrow": "01/02/2023"
    },
    {
      "id":2,
      "title": "Steve Jobs",
      "author": "Walter Isaacson",
      "cover": "https://books.google.com/books/content?id=8U2oAAAAQBAJ&printsec=frontcover&img=0&zoom=1&edge=curl&source=gbs_api",
      "date_of_borrow": "01/03/2023"
    }

  ]

  const [rows, setRows] = useState(borrowedBooks);

  const returnedBook = (id) => {
    // Filter out the clicked row and update the state
    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };


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
                <p class="booksOnLoan_title">{row.title}</p>
                <p class="booksOnLoan_author">{row.author}</p>
                <div class="booksOnLoan_date_borrow"><span>Date of borrow</span>{row.date_of_borrow}</div>
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