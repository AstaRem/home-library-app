import React from 'react';
import ContentWrapper from './ContentWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AddNewBook.css';


const AddNewBook = () => {


  return (
  <ContentWrapper pageTitle="Add New Book">
      <div className="add-new-book">
      <Row className="align-items-center mb-3">
          <Col xs={1}>
            {/* Radios */}
            <Form.Check
              type="radio"
              name="radioGroup"
              id="radio1"
              label=""
            />
          </Col>
          <Col xs={4}>
            {/* Input area */}
            <Form.Control type="text" placeholder="Enter text" />
          </Col>
          <Col xs={2}>
            {/* Search button */}
            <Button variant="primary">Search</Button>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={1}>
            {/* Radios */}
            <Form.Check
              type="radio"
              name="radioGroup"
              id="radio2"
              label=""
            />
          </Col>
          <Col xs={4}>
            {/* "Add manually" text */}
            <span>Add manually</span>
          </Col>
        </Row>
      <div className="add-cancel-btn">
        <button className="btn btn-primary">Add</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
          
      </div>
  </ContentWrapper> 
  )
}

export default AddNewBook