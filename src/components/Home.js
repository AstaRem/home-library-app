import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import OnLoan from './OnLoanModal';
import BookModal from './BookModal';
import '../css/Home.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = (props) => {

  const navigate = useNavigate();

  const [bookList, setBookList] = useState(props.data);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBook_details, setSelectedBook_details] = useState(null);
  const [query, setQuery]= useState ("");
  const [noSearchResults, setNoSearchResults] = useState(false);

  // keep track of bookList
  useEffect(() => {
    console.log("bookList:", bookList);
   }, [bookList]);

   useEffect(() => {
    console.log("query:", query);
   }, [query]);

  
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
        props.updateBookData(updatedBook);
      }
    }

  //Function for searching Library
  function searchLibrary(){
    const searchResults = bookList.filter((book) => {
      return (
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.ISBN.includes(query)
      );
    });
    setBookList(searchResults);
    if(searchResults.length === 0){
      setNoSearchResults(true);
    }
  }

  function resetLibrary(){
    setBookList(props.data);
    setQuery("");
    setNoSearchResults(false);
  }

  function changeSearchInput(event){
     setQuery(event.target.value);
     if (event.target.value==="") {
      resetLibrary();
     }else{
      searchLibrary(event)
     }
  }

  const removeBook = (book_remove) => {
    const updatedBookList = bookList.filter((book) => book.id !== book_remove.id);
    setBookList(updatedBookList);
    props.removeBook(book_remove);
  }

  return (
    <div className="home">
      <section className="jumbotron">
        <div className="container hero-banner text-center">
          <form id="home_form_book_search" onSubmit={searchLibrary} >
            <div className="row row_input">
              <div div className="search_input_wrapper">
                <span className="reset" onClick={() => resetLibrary()}></span>
                <input className="form-control" type="text" placeholder="Please enter book title, author or ISBN" aria-label="Search" id="home_search_input" value = {query  || ""} onChange= {(event)=> changeSearchInput(event) }/>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="section_library">
      <div className="container">
      <div className="home_btn_wrapper">
      <button type="button" className="btn-default" onClick={() => navigate("/AddBook")}>Add New Book</button>
      </div>
        <div className="row no-gutters">
          {bookList.map((book) => (
                <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover = {book.cover}
                isbn = {book.ISBN}
                description = {book.description}
                onloan = {book.onloan}
                ratings = {book.ratings}
                read = {book.read}
                date_of_borrow={book.date_of_borrow}
                opinion = {book.opinion}
                borrower={book.borrower}
                onOpenModal={openOnLoanModal}
                onOpenBookModal={openBookModal}
                />
          ))}
          <div className={`message_noResults ${noSearchResults ? "display" : ""}`}>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass-arrow-right" className="icn_search_arrow" />
            <span className="msg">Your library does not have this book.</span>
            </div>
        </div>
      </div>
      </section>
      <OnLoan
          selectedItem={selectedItem}
          updateBookList = {updateBookList}
      /> 
      <BookModal
        selectedBook={selectedBook_details}
        updateBookList = {updateBookList}
        removeBook = {removeBook}
       />
    </div>
  )
}

export default Home


