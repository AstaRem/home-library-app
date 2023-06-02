import React from 'react';
import '../css/BookCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OnLoan from './OnLoanModal';

const BookCard=(props)=> {
  return (
    <div className="card-container col-lg-4 col-md-6 col-sm-12">
      <div className="card">
        <img src={props.image} className="card-img-top" alt={props.title} />
          <div className="card-body">
            <div className="card_btn_wrapper">
              <button type="button" className="btn-default small" data-toggle="modal" data-target="#exampleModal">On Loan</button>
              <FontAwesomeIcon icon="fa-solid fa-ellipsis" style={{color: "#000333",}} />
            </div>
          </div>
      </div>
      <OnLoan /> 
    </div>
  )
}

export default BookCard