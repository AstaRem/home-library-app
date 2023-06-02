import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/BookModal.css'

function BookModal(){
    return(
        <div>
        {/* <!-- Button trigger modal -->  */}
      
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch book modal
    </button>
  
    
     {/* <!-- Modal -->  */}
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center" id="exampleModalLabel">In Search of Lost Time</h5>
  
  
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

          <div className="row book-container ">

              <div className="OnLoan_book_cover col-4">
                  <img src="" alt=""/>
                </div>
            
            <div className="col-8">
              <h5>Marcel Proust</h5>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio earum cum nihil voluptatum sapiente itaque exercitationem laudantium. Quam eaque similique deserunt aspernatur facere, officiis harum, voluptatum doloribus ipsum enim sed.</p>
            </div>
          </div>
            
              <form>
                
              <div className="checkbox-container">
                <div className="form-group form-check on-loan">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" for="exampleCheck1">On loan</label>
                </div>    
                
                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" for="exampleCheck1">Read</label>
                </div>
              </div>

              <p id="borrower">Borrower: Asta</p>

                  <div className="form-group ratings-container">
                    <label for="ratings">Rating:</label>
                    <select className="form-control" id="ratings">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>

                  <div className="form-group my-notes">
                    <label for="name_of_borrower" className="name_of_borrower">My notes:</label>
                    <textarea className="form-control" id="name_of_borrower" rows="4"></textarea>
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
}

export default BookModal;