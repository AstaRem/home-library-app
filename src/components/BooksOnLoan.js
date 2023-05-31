import React from 'react';
import ContentWrapper from './ContentWrapper';
import '../css/Contact.css';

const BooksOnLoan = () => {   
  return (
  <ContentWrapper pageTitle="Books On Loan">
      <div className="booksOnLoan_borrowed_books">
          <ul>
              <li>
                  <div className="booksOnLoan_image_holder"></div>
                  <div className="booksOnLoan_book_info">
                      <p>Book Title</p>
                      <p>Author</p>
                  </div>
                  <div className="booksOnLoan_dateOfBorrow">31/05/2023</div>
                  <button type="button" className="btn" onClick="">Returned</button>
              </li>
          </ul>

      </div>
  </ContentWrapper> 
  )
}

export default BooksOnLoan