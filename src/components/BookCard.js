import React from 'react';
import Rating from './Rating';
import '../css/BookCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BookCard=(props)=> {
  return (
    <div className="card-container col-lg-2 col-md-6 col-sm-12" key={props.id}>
      <div className="card">
        <div className="cover_holder">
          <img src={props.cover} className="card-img-top" alt={props.title} />
          <div className="rating_wrapper">
            <Rating ratings={props.ratings} />
          </div>
        </div>
        <div className="card-body">
          <div className="card_btn_wrapper">
            <button type="button" className={`btn-default small ${props.onloan ? "disabled" : ""}`} data-toggle="modal" data-target="#exampleModal" onClick={() => props.onOpenModal(props)}>On Loan</button>
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" className="ellipsis"  data-toggle="modal" data-target="#bookModal" onClick={() => props.onOpenBookModal(props)}/>
            </div>
          </div>
      </div>
      
  </div>
  )
}

export default BookCard