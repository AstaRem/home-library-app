import React, { useRef, useState, useEffect } from 'react';
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
                <div className="modal-header">
                <h5 className="modal-title text-center" id="bookModalLabel">{formDataBookModel.title}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => onCloseModal()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row book-container ">
                      <div className="OnLoan_book_cover col-4">
                        <img src={formDataBookModel.cover} alt={formDataBookModel.title}/>
                      </div>
                      <div className="col-8"> 
                        <h5>Marcel Proust</h5>
                        <p>{formDataBookModel.description}</p>
                      </div>
                  </div>

                    <form ref={formBookInfo} onSubmit={handleSubmit} >
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
                        <p id="borrower">Borrower: {formDataBookModel.borrower}<br/>
                        Borrowed on: {formDataBookModel.date_of_borrow}
                        </p>
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
                              {formDataBookModel.opinion}
                            </textarea>
                          </div>
                          <div className="modal-footer justify-content-end">
                            <button type="submit" className="btn btn-primary btn-save">Save</button>
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