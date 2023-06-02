import React from 'react';
import ContentWrapper from './ContentWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AddNewBook.css';


const AddNewBook = () => {


  return (
  <ContentWrapper pageTitle="Add New Book">
      <div className="add-new-book">
      <div className="Add-new-book">
        <button className="btn btn-primary">Add</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
          
      </div>
  </ContentWrapper> 
  )
}

export default AddNewBook