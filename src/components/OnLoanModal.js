import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/OnLoanModal.css';
import ChooseDate from './ChooseDate';


function OnLoan (props){

  console.log(props.selectedItem);

  const inputChange = (event) => {
    console.log(event.target.value);
  }

  if((props.selectedItem)!== null){
    return (
  <div> 
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">On Loan</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <div className="container" id="book_info">
              <div className="row justify-content-start no-gutters">
                <div className="OnLoan_book_cover col-6 d-inline-block">
                  <img src={props.selectedItem.cover} alt={props.selectedItem.title} className="img-fluid" />
                </div>

                <div className="book_details col-6">
                  <h5><span className="book_name">Book title:&nbsp;</span>{props.selectedItem.title}</h5>
                  <h5><span className="book_name">Author:&nbsp;</span>{props.selectedItem.author}</h5>
                </div>
              </div>
            </div>

                <form>
                    <div className="form-group">
                      <label htmlFor="datepicker" className="datepicker">Date of borrow:</label>
                      <ChooseDate />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name_of_borrower" className="name_of_borrower">Borrower:</label>
                      <input className="form-control" id="name_of_borrower" placeholder="Please enter the name of borrower" value={props.selectedItem.borrower} onChange={inputChange} />
                    </div>
                </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-default" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn-default btn-save-add">Save</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    ) 
    }else{
      console.log("No item selected");
    };
  }
  
  export default OnLoan;

