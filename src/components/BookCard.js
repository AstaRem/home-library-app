import React from 'react';
import '../css/BookCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const BookCard=(props)=> {
  return (
    <div className="card-container col-lg-2 col-md-6 col-sm-12" key={props.id}>
      <div className="card">
        <img src={props.cover} className="card-img-top" alt={props.title} />
          <div className="card-body">
            <div className="card_btn_wrapper">
              <button type="button" className="btn-default small" data-toggle="modal" data-target="#exampleModal" onClick={() => props.onOpenModal(props)}>On Loan</button>
              <FontAwesomeIcon icon="fa-solid fa-ellipsis" style={{color: "#000333",}} />
              </div>
            </div>
      </div>
      
  </div>
  )
}

export default BookCard