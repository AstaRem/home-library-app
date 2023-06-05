import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/BookModal.css'

function BookModal(props){

  const [formDataBookModel, setFormDataBookModel] = useState({}); // State to hold form data
  const formBookInfo = useRef(null);

  useEffect(() => {
    if (props.selectedBook !== null){
      setFormDataBookModel(props.selectedBook);
    }
  }, [props.selectedBook]);

  // tracking the formDataBookModel
  useEffect(() => {
    console.log("formDataBookModel:", formDataBookModel);
   }, [formDataBookModel]);

   const handleSubmit = (event) => {
    event.preventDefault();
    props.updateBookList(formDataBookModel);
    setTimeout(() => {
      onCloseModal();
    }, 100);
   }

   const onLoanChange = (event) => {
    setFormDataBookModel({
      ...formDataBookModel,
      "onloan": !formDataBookModel.onloan
    })
    console.log("formDataBookModel: " + JSON.stringify(formDataBookModel));
   }

   const onReadChange = (event) => {
    setFormDataBookModel({
      ...formDataBookModel,
      "read": !formDataBookModel.read
    })
    console.log("formDataBookModel: " + JSON.stringify(formDataBookModel));
   }

   const onRatingsChange = (event) => {
    setFormDataBookModel({
      ...formDataBookModel,
      "ratings": event.target.value
    })
    console.log("formDataBookModel: " + JSON.stringify(formDataBookModel));
  }

   const inputOpinionChange = (event) => {
    setFormDataBookModel({
      ...formDataBookModel,
      "opinion": event.target.value
    })
    console.log("formDataBookModel: " + JSON.stringify(formDataBookModel));
  }

   const onCloseModal = () => {
    formBookInfo.current.reset();//reset form
    document.getElementById("bookModal").classList.remove("show");
    document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
  }

  if((props.selectedBook)!== null){
    return(
        <div>
          <div className="modal fade" id="bookModal" tabIndex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header row">
                  <div class="book_title text-center col-11">
                    <h5 className="modal-title " id="bookModalLabel">{formDataBookModel.title}</h5>
                  </div> 
                  <div class="col-1 closing_icon">
                  <FontAwesomeIcon 
                    icon={faRectangleXmark} 
                    size="2xl" 
                    style={{color: "#ffad4d",}} 
                    type="button" 
                    className="close" 
                    data-dismiss="modal" 
                    aria-label="Close" 
                    onClick={() => onCloseModal()} 
                  />  
                  </div>           

                </div>
                <div className="modal-body">
                  <div class="container">
                    <div className="row book_container justify-content-between ">
                        <div className="OnLoan_book_cover col-3">
                          <img src={formDataBookModel.cover} alt={formDataBookModel.title}/>
                        </div>
                        <div className="col-9 book_details"> 
                          <h5>{formDataBookModel.author}</h5>
                          <p>{formDataBookModel.description}</p>
                        </div>
                    </div>
                  </div>

                    <form ref={formBookInfo} onSubmit={handleSubmit} >
                    <div class="container loan_details">
                    {/* <div class="row"></div> */}
                      <div className="checkbox-container row">
                        <div className="form-group form-check on-loan col-sm-4">
                            <input type="checkbox" className="form-check-input" id="isOnLoan" checked = {formDataBookModel.onloan || false} onChange={(event)=>onLoanChange(event)} />
                            <label className="form-check-label"htmlFor="isOnLoan">&nbsp; &nbsp;On loan</label>
                        </div>    
                        <div className="form-group form-check col-sm-4">
                          <input type="checkbox" className="form-check-input" id="isRead" checked = {formDataBookModel.read || false} onChange={(event)=>onReadChange(event)}/>
                          <label className="form-check-label" htmlFor="isRead">&nbsp; &nbsp; Read</label>
                        </div>
                      </div>

                      <div className="col-sm-12 borrower_details form-group">
                        <p id="borrower">Borrower: {formDataBookModel.borrower}<br/>
                        Borrowed on: {formDataBookModel.date_of_borrow}
                        </p>
                      </div>

                      
                          <div className="form-group ratings_container col-sm-4 ">
                            <label htmlFor="ratings" id="ratings_label">Ratings:</label>
                            <select className="form-control" id="ratings" value={formDataBookModel.ratings || 0} onChange={(event)=>onRatingsChange(event)}>
                                <option>0</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                            </select>
                          </div>
                        
                        
                          <div className="form-group my-notes ">
                            <label htmlFor="name_of_borrower" className="name_of_borrower">My notes:</label>
                            <textarea className="form-control" id="name_of_borrower" rows="4" value={formDataBookModel.opinion || ""} onChange={(event)=>inputOpinionChange(event)}> 
                            </textarea>
                          </div>
                        </div>

                          <div className="modal-footer justify-content-end">
                            <button type="submit" className="btn-default btn-save-add">Save</button>
                          </div>
                    </form>

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