import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/OnLoanModal.css'

function OnLoan (){
    return (
  <div>
    {/* <    <!-- Button trigger modal --> 
    I am leaving the button to triger Modal here for now
    */}
{/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button> */}

  
  {/* <!-- Modal --> */}
  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">On Loan</h5>


          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
            <div className="OnLoan_book_cover">
                <img src="" alt=""/>
              </div>
            <h5><span className="book_name">Book title:</span> adkfjajfdajf</h5>
            <h5><span className="book_name">Author:</span> czvnbzjvcc</h5>
          
            <form>
                <div className="form-group">
                  <label for="datepicker" className="datepicker">Date of borrow:</label>
                  <input type="email" className="form-control" id="datepicker" placeholder="Datepicker" />
                </div>
                <div className="form-group">
                  <label for="name_of_borrower" className="name_of_borrower">Borrower:</label>
                  <textarea className="form-control" id="name_of_borrower" rows="2" placeholder="Please enter the name of borrower"></textarea>
                </div>
              </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  </div>
      )
  }
  
  export default OnLoan;
