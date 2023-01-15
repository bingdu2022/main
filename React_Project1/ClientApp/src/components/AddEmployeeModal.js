import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, ButtonToolbar,Image } from 'react-bootstrap';

export class AddEmployeeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: [], imageurl: []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
  }

  photofilename = 'anonymous.png';
  imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;  // Video has this only but the image is not refreshed after uploading, so I added imageurl in this.state.
  // The possible reason could be my React_Project1 has an issue of " ...WebSocket connection to ‘wss://localhost:xxxx/colibri-ws/ failed:..." due to a possible bug of VS
  //Load images: https://www.upbeatcode.com/react/where-to-store-images-in-react-app/

//  Normally sql server space is more expensive than ordinary disk space in hosting environment.
// You can name images in a Search Engine optimized way
//  Essay to manage, backup and restore images and database.
//  More suitable for static pages, (if you optimize some pages for performance)

  // You have to convert the Image file either in to bytes Array or Image Stream before saving it to the Database.

  //I'm in charge of some applications that manage many TB of images. We've found that storing file paths in the database to be best.
  // many web servers use the operating system's sendfile() system call to asynchronously send a file directly from the file system to the network interface.
  // things like web servers, etc, need no special coding or processing to access images in the file system
//  databases win out where transactional integrity between the image and metadata are important.
//  it is more complex to manage integrity between db metadata and file system data
//it is difficult(within the context of a web application) to guarantee data has been flushed to disk on the filesystem

  //I chose storing images in the database because of the single backup advantage (or more generally speaking, having all data in one place), but the problems you mention are true as well, which is why I cache the images on the filesystem. It's the best of both worlds, and I'm surprised none of the top answers here mention it.

  //File paths in the DB is definitely the way to go - I've heard story after story from customers with TB of images that it became a nightmare trying to store any significant amount of images in a DB - the performance hit alone is too much

  //Small static images (not more than a couple of megs) that are not frequently edited, should be stored in the database. This method has several benefits including easier portability (images are transferred with the database), easier backup/restore (images are backed up with the database) and better scalability (a file system folder with thousands of little thumbnail files sounds like a scalability nightmare to me).
  //Smaller sized files can be efficiently stored and delivered using the database as the storage mechanism. Larger files would probably be best stored using the file system, especially if they will be modified/updated often

  // Filestream service is great for applications need to generate maybe a few hundred to thousand “static” files every now and then, but if you have tens of thousands of users generating files, and each user generating multiple times, FILESTREAM is not the way to go





  getAndPopulateDepartment() {
    fetch(process.env.REACT_APP_API+'department')
      .then(res => res.json()).then(data => {
        this.setState({ deps: data, imageurl:this.imagesrc  }); { this.props.onUpdated() }
      }).catch(error => alert('Failed: ' + error))
  }

  handleFileSelected(event) {
    event.preventDefault();
    this.photofilename = event.target.files[0].name;
    const formData = new FormData();
    formData.append(
      'myFile',
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + 'employee/uploadimagefile', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json()).then(
        (result) => {
          this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
          this.setState({ imageurl: this.imagesrc });
        },
        (error) => alert('Failed: ' + error))
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
        PhotoFileName: this.photofilename
      })
    })
      .then(res => res.json()).then(data => {alert(data); { this.props.onUpdated() };}).catch(error=>alert('Failed!' + error ));
  }

  componentDidMount() { this.getAndPopulateDepartment(); }
  //componentDidUpdate() {
  //  if (this.state.)
  //}
  componentDidUpdate() {
    //this.getAndPopulateDepartment();
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

                  <Form.Group controlId='Department' ><Form.Label>Department</Form.Label>
                    <Form.Control as='select'>
                      {this.state.deps.map(x => <option key={x.DepartmentId}>{x.DepartmentName}</option>)}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId='DateOfJoining'><Form.Label>DateOfJoining</Form.Label>
                    <Form.Control type='date' name='DateOfJoining' required placeholder='DateOfJoining' />
                  </Form.Group>

                  <ButtonToolbar><Button variant='primary' type='submit'>Save</Button></ButtonToolbar>

                </Form>
              </Col>

              <Col sm={6}>
                <Image width='200px' height='200px' src={this.state.imageurl} />
                <input onChange={this.handleFileSelected} type='File'/>

              </Col>

            </Row>
          </Modal.Body>

          <Modal.Footer> <Button className='mr-2' variant='danger' onClick={this.props.onHide}>Close</Button></Modal.Footer>

        </Modal>


      </div>

      )

  }
}