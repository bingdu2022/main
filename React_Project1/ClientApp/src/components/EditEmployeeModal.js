// It's created by copying/pasting AddDepartmentModal.js and then make some changes

import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';  //https://www.geeksforgeeks.org/react-bootstrap-modal-component/

export class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();  // a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh.       https://www.robinwieruch.de/react-preventdefault/
    fetch(process.env.REACT_APP_API + 'employee', {  // a promise call or returns a promise or HTTP response
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  // Here is convert the JS {.} including users' input into a JSON string
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        DateOfJoning: event.target.DateOfJoning.value,
        PhotoFileName: event.target.PhotoFileName.value
      })
    })
      .then(res => res.json())  // the first .then resolve the response from the server, where it is getting response object that is representation of the entire HTTP response
      // or to extract the JSON body content from the Response object, we need to use the json() method
      // which returns the second promise 

      .then(result => {         // the second .then get the data from the response
        // that resolves with the result of parsing the response body text as JSON
        alert(result);   // Shows users a popup on the result of submitting data
      },
        (error) => { alert('Failed'); }
      )
  }

  render() {
    return (
      <div className='container'>

        <Modal {...this.props}
          size="lg"
          aria-labelledby='contained-modal-title-vcenter'
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'>
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>

                  <Form.Group controlId='DepartmentId'>
                    <Form.Label>DepartmentId</Form.Label>
                    <Form.Control type='text' name='DepartmentId' required
                      disabled defaultValue={this.props.deptid}
                      placeholder='DepartmentId' />
                  </Form.Group>

                  <Form.Group controlId='DepartmentName'>
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control type='text' name='DepartmentName' required
                      defaultValue={this.props.deptname}
                      placeholder='DepartmentName' />
                  </Form.Group>

                  <Form.Group>
                    <Button variant='primary' type='submit'> Update Department - {this.props.tmp_x} </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer> <Button variant='danger' onClick={this.props.onHide}>Close</Button> </Modal.Footer>
        </Modal>
      </div>
    )
  }
}