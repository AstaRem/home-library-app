import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import OnLoan from './OnLoanModal';
import BookModal from './BookModal';
import '../css/Home.css';
import { useNavigate } from "react-router-dom";

const Home = (props) => {

  const navigate = useNavigate();

  const [bookList, setBookList] = useState(props.data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBook_details, setSelectedBook_details] = useState(null);

  // keep track of bookList
  useEffect(() => {
    console.log("bookList:", bookList);
   }, [bookList]);

  
  //Function for opening on loan modal
  const openOnLoanModal = (book) => {
    setSelectedItem(book);
  };

    //Function for opening book modal
    const openBookModal = (book) => {
      setSelectedBook_details(book);
    };

    const updateBookList = (updatedBook) => {
      const bookIndex = bookList.findIndex((book) => book.id === updatedBook.id);
      if (bookIndex !== -1) {
        const updatedList = [...bookList];
        updatedList[bookIndex] = updatedBook;
        setBookList(updatedList);
      }
    }


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
      <button type="button" className="btn-default" onClick={() => {navigate("/AddNewBook");
        }}>Add New Book</button>
      </div>
        <div className="row no-gutters">
          {bookList.map((book) => (
                <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover = {book.cover}
                onloan = {book.onloan}
                ratings = {book.ratings}
                read = {book.read}
                date_of_borrow={book.date_of_borrow}
                borrower={book.borrower}
                onOpenModal={openOnLoanModal}
                onOpenBookModal={openBookModal}
                />
          ))}
        </div>
      </div>
      </section>
      <OnLoan
          selectedItem={selectedItem}
          updateBookList = {updateBookList}
      /> 
      <BookModal
        selectedBook={selectedBook_details}
       />
    </div>
  )
}

export default Home


