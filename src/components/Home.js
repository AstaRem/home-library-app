import React, { useState } from 'react';
import BookCard from './BookCard';
import OnLoan from './OnLoanModal';
import allBooks from '../data/all_books_demo.json';
import '../css/Home.css';



const Home = () => {

  const [bookList, setBooks] = useState(allBooks);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (book) => {
    setSelectedItem(book);
  };

  return (
    <div>
      <section className="jumbotron">
        <div className="container hero-banner text-center">
          <form id="home_form_book_search">
            <div className="row row_input">
              <input className="form-control" type="text" placeholder="Please enter book title, author or ISBN" aria-label="Search" id="home_search_input"/>
            </div>
            <button className="btn-default" type="submit" id="home_form_book_search_btn">SEARCH</button>
          </form>
        </div>
      </section>
     
      <section className="section_library">
      <div className="container">
      <div className="home_btn_wrapper">
        <button type="button" className="btn-default">Add New Book</button>
      </div>
        <div className="row no-gutters">
          {bookList.map((book) => (
                <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover = {book.cover}
                date_borrowed={book.date_borrowed}
                borrower={book.borrower}
                onOpenModal={openModal}
                />
          ))}
        </div>
      </div>
      </section>
      <OnLoan
          selectedItem={selectedItem}
      /> 
    </div>
  )
}

export default Home


