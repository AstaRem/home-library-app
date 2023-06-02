import React from 'react';
import '../css/Home.css';


function Home() {
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
    </div>
  )
}

export default Home


