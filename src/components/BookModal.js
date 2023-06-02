import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/BookModal.css'

function BookModal(props){
  if((props.selectedBook)!== null){
    return(
        <div>
          <div className="modal fade" id="bookModal" tabIndex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title text-center" id="bookModalLabel">{props.selectedBook.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row book-container ">
                      <div className="OnLoan_book_cover col-4">
                        <img src={props.selectedBook.cover} alt={props.selectedBook.title}/>
                      </div>
                      <div className="col-8"> 
                        <h5>Marcel Proust</h5>
                        <p>{props.selectedBook.desctription}</p>
                      </div>
                  </div>
                    <form>
                    <div className="checkbox-container">
                      <div className="form-group form-check on-loan">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label"htmlFor="exampleCheck1">On loan</label>
                      </div>    
                      <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                        <label className="form-check-label" htmlFor="exampleCheck2">Read</label>
                      </div>
                    </div>
                      <p id="borrower">Borrower: {props.selectedBook.borrower}</p>
                        <div className="form-group ratings-container">
                          <label htmlFor="ratings">Ratings:</label>
                          <select className="form-control" id="ratings">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                        <div className="form-group my-notes">
                          <label htmlFor="name_of_borrower" className="name_of_borrower">My notes:</label>
                          <textarea className="form-control" id="name_of_borrower" rows="4">
                            {props.selectedBook.opinion}
                          </textarea>
                        </div>
                      </form>
                </div>
                <div className="modal-footer justify-content-end">
                  <button type="button" className="btn btn-primary btn-save">Save</button>
                </div>
              </div>
            </div>
          </div>
    </div>
    )
  }else{
    console.log("No book selected");
  }
}

export default BookModal;