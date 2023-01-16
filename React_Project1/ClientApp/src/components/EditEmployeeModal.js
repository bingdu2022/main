// It's created by copying/pasting AddDepartmentModal.js and then make some changes

import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';  //https://www.geeksforgeeks.org/react-bootstrap-modal-component/
import { Input } from 'reactstrap';

export class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadSelectedFilesToServer = this.uploadSelectedFilesToServer.bind(this);
    this.state = {deps:[],imageurl:[]};
  }

  photoFileName = 'anonymous.png';
  imgsrc = process.env.REACT_APP_PHOTOPATH + this.photoFileName;

  getAndPopluateDeps() {
    fetch(process.env.REACT_APP_API + 'department')
      .then(res => res.json()).then(data => this.setState({ deps: data, imageurl:this.imgsrc }))
    .catch(error=>alert('Failed: '+error))
  }

  handleSubmit(event) {
    event.preventDefault();  // a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh.       https://www.robinwieruch.de/react-preventdefault/
    fetch(process.env.REACT_APP_API + 'employee', {  // a promise call or returns a promise or HTTP response
      method: 'PUT',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({  // Here is convert the JS {.} including users' input into a JSON string
        EmployeeName: event.target.EmployeeName.value,
        Department: event.target.DepartmentName.value,
        DateOfJoning: event.target.DateOfJoining.value,
        PhotoFileName: this.photoFileName
      })
    })
      .then(res => res.json())  // the first .then resolve the response from the server, where it is getting response object that is representation of the entire HTTP response
      // or to extract the JSON body content from the Response object, we need to use the json() method
      // which returns the second promise 

      .then(result => {         // the second .then get the data from the response
        // that resolves with the result of parsing the response body text as JSON

        // we've successfully saved the new employee with new EmployeeId or EmployeeName, so we can upload the new image into the server db if we want
        fetch(process.env.REACT_APP_API + 'employee/uploadimagefiletodb', { method: 'POST', body: this.formData })
          .then(res => res.json()).then(data =>
            alert(result)   // Shows users a popup on the result of submitting data
          ).catch(error => alert('Failed to edit the employee info!'))
      },
        (error) => alert('Failed: ' + error))
  }

  formData =null;
  uploadSelectedFilesToServer(event) {
        this.photoFileName = event.target.files[0].name;
    this.formData = new FormData();
    this.formData.append(this.props.e_empid, event.target.files[0], event.target.files[0].name);  // 'myFiles' could be 'f1,f2,...' multi ids or names for multi files, but here is just for one file for testing purpose
    fetch(process.env.REACT_APP_API + 'employee/uploadimagefile', { method: 'POST', body: this.formData })
      .then(res => res.json()).then(result => {
        this.imgsrc = process.env.REACT_APP_PHOTOPATH + result;
        this.setState({ imageurl: this.imgsrc })
      }).catch(error => { alert('Failed: ' + error); this.formData=null })
  }

  componentDidMount() {this.getAndPopluateDeps()}

  render() {
    //console.log('{this.props.e_empdep}: ',  this.props.e_empdep );
    console.log('this.state.imageurl: ', this.state.imageurl);
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

                  <Form.Group controlId='EmployeeId'>
                    <Form.Label>DepartmentId</Form.Label>
                    <Form.Control type='text' name='EmployeeId' required
                      disabled defaultValue={this.props.e_empid}
                      placeholder='EmployeeId' />
                  </Form.Group>

                  <Form.Group controlId='EmployeeName'>
                    <Form.Label>EmployeeName</Form.Label>
                    <Form.Control type='text' name='EmployeeName' required
                      defaultValue={this.props.e_empname}
                      placeholder='EmployeeName' />
                  </Form.Group>

                  <Form.Group controlId='DepartmentName'>
                    <Form.Label>DepartmentName</Form.Label>
                    <Form.Control as='select' required 
                      defaultValue={this.props.e_empdep}>
                      {this.state.deps.map(x => <option key={x.DepartmentId}>{x.DepartmentName} </option>)}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='DateOfJoining'><Form.Label>DateOfJoining</Form.Label>
                    <Form.Control type='date' name='DateOfJoining' required
                      defaultValue={this.props.e_doj} placeholder='dateofjoining' />
                  </Form.Group>

                  <Form.Group>
                    <Button variant='primary' type='submit'> Save Employee </Button>
                  </Form.Group>
                </Form>
              </Col>

              <Col sm={6}>
                <Image width='200px' height='200px' src={process.env.REACT_APP_PHOTOPATH + this.props.e_photoname} />
                <Input type='File' onChange={this.uploadSelectedFilesToServer} />
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer> <Button variant='danger' onClick={this.props.onHide}>Close</Button> </Modal.Footer>
        </Modal>
      </div>
    )
  }
}