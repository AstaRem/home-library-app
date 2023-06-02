import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
            <Form.Control type="text" id="search-book" placeholder="Book title, author or ISBN" />
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
        <Row>
          <Col>
            <Button className="mr-2" variant="primary">Add</Button>
            <Button variant="secondary">Cancel</Button>
          </Col>
        </Row>
          
      </div>
  </ContentWrapper> 
  )
}

export default AddNewBook