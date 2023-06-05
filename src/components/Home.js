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
  const [query, setQuery]= useState ("");

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


  function searchLibrary(event){
    event.preventDefault();
    // const searchResults=[];

    const searchResults = bookList.filter((book)=> book.title == query|| book.author == query|| book.ISBN == query);

    // const splitQuery = query.split(" ");

    // for (let i = 0; i < splitQuery.length; i++) {
    //   const checkResults = bookList.filter((book)=> book.title == splitQuery[i]|| book.author == splitQuery[i]|| book.ISBN == splitQuery[i]);
      
    //   if(checkResults) {
    //   // searchResults=[...searchResults,...checkResults];
    
    //   }
    // }

    // console.log("splitQuery",splitQuery);

    console.log ("query" + query);
    
    console.log("searchResults: " + JSON.stringify(searchResults));

    setBookList(searchResults);

  }

  function resetLibrary(){

    setBookList(props.data);

  }

  function changeSearchInput(event){
   
     setQuery(event.target.value);
     if (event.target.value=="") {
      resetLibrary();

     }

  }

  // const[searchbookList, setSearchbookList]
  // const searchbookList = filter.bookList

 
  

//{bookList.filter}

//}
   // const searchLibrary=bookList.filter
  //
//const searchLibrary =(bookList) =>{}


//setBookList(bookList);

//const hand
//onChange= {(e)=> setBooklist(e.target.value)}


  return (
    <div>
      <section className="jumbotron">
        <div className="container hero-banner text-center">
          <form id="home_form_book_search" onSubmit={searchLibrary} >
            <div className="row row_input">
              <input className="form-control" type="text" placeholder="Please enter book title, author or ISBN" aria-label="Search" id="home_search_input" onChange= {(event)=> changeSearchInput(event) }/>
            </div>
            <button className="btn-default" type="submit" id="home_form_book_search_btn">SEARCH</button>
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
       />


     {/* <searchLibrary
       bookList={}
       setbookList={} />  */}
    </div>
  )
}

export default Home


