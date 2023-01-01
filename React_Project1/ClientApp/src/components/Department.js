//To make me show up:
//1. Create a clickable button: NavMenu.js: <NavItem> <NavLink tag={Link} className="text-dark" to="/department">Department</NavLink> </NavItem>
//2. Register url route: App.js: <Route path='/department' component={Department} />
//3. After doing #2 above, this seems auto-done: import { Department } from './components/Department'; in App.js

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';  //https://react-bootstrap.github.io/components/table/
/*th is used for table header cells while td is used for table data cells*/

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { departments: [], addModalShow:false, editModalShow:false }
  }

  // REACT_APP_API is created in ClientApp/.env file based on iisSettings in launchSettings.json of WebAPI_Core project
  refreshDepartmentList() {
    fetch(process.env.REACT_APP_API + 'department')
      .then(response => response.json())
      .then(data => {
        this.setState({ departments: data });
      })
      .catch(error => { console.error(error); console.log('error', error.message) });
  }

  componentDidMount() { this.refreshDepartmentList(); }

  componentDidUpdate() { this.refreshDepartmentList(); }

  deleteDepartment(id) {
    if (window.confirm("Are you sure?")) {
      fetch(process.env.REACT_APP_API + 'department/' + id, {method: 'DELETE'}).catch(error=>alert('Failed!'))
    }
  }

  //*use className="trClassName" try to customize the row height in custom.css*/
  render() {
    const { departments,departmentId,departmentName,tmpX } = this.state;  // it's called destructing assignment and is the same to const departments = this.state.departments
    // tmpX works and it means we can add many more new state arguments here. But not sure on the differences between the args here and inside constructor{.} ? 
    //console.log('departments:', departments);
    //console.log('departmentId:', departmentId);

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });
    let deleteModalClose = () => this.setState({ deleteModalShow: false });
    return (
      //<div className="mt-5 d-flex justify-content-left"> this is Department page.</div>
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr className="trClassName">  
              <th>DepartmentId</th>      
              <th>DepartmentName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(x =>
              <tr key={x.DepartmentId}>
                <td>{x.DepartmentId}</td>
                <td>{x.DepartmentName}</td>
                <td>
                  <ButtonToolbar>
                    <span>
                      <Button className='mr-2' variant='info'
                        onClick={() => this.setState({ editModalShow: true, departmentId: x.DepartmentId, departmentName: x.DepartmentName, tmpX: x.DepartmentName })}>
                        Edit
                    </Button> 
                    <Button className='mr-2' variant='danger'
                      onClick={() => this.deleteDepartment(x.DepartmentId)}>
                        Delete
                      </Button>
                      </span>
                    <EditDepartmentModal show={this.state.editModalShow} onHide={editModalClose} deptid={departmentId} deptname={departmentName} tmp_x={tmpX} />
                  </ButtonToolbar>
                </td>
              </tr>)
            }
          </tbody>
        </Table>

        <ButtonToolbar>
          <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Department</Button>
          <AddDepartmentModal show={this.state.addModalShow} onHide={addModalClose} />
        </ButtonToolbar>

      </div>
    )
  }
}