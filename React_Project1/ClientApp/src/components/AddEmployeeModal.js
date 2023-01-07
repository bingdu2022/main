import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, ButtonToolbar } from 'react-bootstrap';

export class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + 'employee', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.Department.value,
        DateOfJoining: event.target.DateOfJoining.value,
        PhotoFileName: event.target.PhotoFileName.value
      })
    })
      .then(res => res.json()).then(data => {alert(data); { this.props.onUpdated() };}).catch(error=>alert('Failed!' + error ));
  }

  render() {
    return (

      <div className='container'>
        <Modal {...this.props} size='lg' aria-labelledby='contained-modal-title-vcenter'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter'  >Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group><Form.Label>EmployeeName</Form.Label>
                    <Form.Control type='text' name='EmployeeName' required placeholder='EmployeeName' />
                  </Form.Group>
                  <Form.Group><Form.Label>Department</Form.Label>
                    <Form.Control type='text' name='Department' required placeholder='Department' />
                  </Form.Group>
                  <Form.Group><Form.Label>DateOfJoining</Form.Label>
                    <Form.Control type='text' name='DateOfJoining' required placeholder='DateOfJoining' />
                  </Form.Group>
                  <Form.Group><Form.Label>PhotoFileName</Form.Label>
                    <Form.Control type='text' name='PhotoFileName' placeholder='PhotoFileName' />
                  </Form.Group>

                  <ButtonToolbar><Button variant='primary' type='submit'>Save</Button></ButtonToolbar>

                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer> <Button className='mr-2' variant='danger' onClick={this.props.onHide}>Close</Button></Modal.Footer>

        </Modal>


      </div>

      )

  }
}