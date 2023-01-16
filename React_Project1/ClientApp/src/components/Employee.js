
import React, { Component, PureComponent } from 'react';
import {Table, Button, ButtonToolbar } from 'react-bootstrap';

import { AddEmployeeModal } from './AddEmployeeModal';
import { EditEmployeeModal } from './EditEmployeeModal';


export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [], isUpdated: false, addModalShow: false, editModalShow: false }
  }

  setIsUpdatedToTrue = () => { const isUpdated = true; this.setState({ isUpdated }); }
  setIsUpdatedToFalse() { const isUpdated = false; this.setState({ isUpdated }); }
  
  getAndPopluateEmployees() {
    fetch(process.env.REACT_APP_API + 'employee').then(res => res.json()).then(data => { this.setState({ employees: data });})
      .catch(error => alart(error.message));
  }

  componentDidMount() { this.getAndPopluateEmployees(); };
  componentDidUpdate(prevState) {

    // The below doesn't work and it always show prevProps.employees undefined
    // It seems the employees defined in the hooks of const {employees ...} in render() is different from this.state = {employees ...}
    console.log('prevProps.employees', prevState.employees); console.log('this.props.employees', this.state.employees);
    if (prevState.employees !== undefined && prevState.employees !== this.state.employees) { this.getAndPopluateEmployees(); };

    if (this.state.isUpdated) {
      this.setIsUpdatedToFalse();
      this.getAndPopluateEmployees();
    }
  }

  deleteEmployee(x) {
    if (window.confirm('Are you sure')) {
      fetch(process.env.REACT_APP_API + 'employee',
        {
          method: 'DELETE',
          headers: { 'Accept': 'application/json','Content-Type':'application/json'},
          body: JSON.stringify({Names:x})
        })
        .then(res => res.json()).then(data => { this.setIsUpdatedToTrue() }).catch(error => alert('Failed'));
    }
  }

//  <EditEmployeeModal show={this.state.editModalShow} onHide={editModalClose} deptid={empId} deptname={empName} dep={dep} dof={dateOfJoining} pname={photoname} />


  // why x.employeename is because API EmployeeController.cs intentionally lowercases it for testing case sensitivity. 
  // it proves it has to be EXACTLY like that or cannot be use database table query output formats (e.g. EmployeeName etc).
  render() {
    const { employees, empId, empName, dep, dateOfJoining, photoname } = this.state;
    //console.log('employees', employees);
    let addModalClose = () => { this.setState({ addModalShow: false }) };
    let editModalClose = () => { this.setState({ editModalShow: false }) };

    return (
      //<div className="mt-5 d-flex justify-content-left"> Employee page</div>
      <div>
        <Table className='mt-4' striped bordered size='sm'>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>DateOfJoining</th>
              <th>PhotoFileName</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(x =>
              <tr key={x.EmployeeId}>
                <td>{x.EmployeeId}</td>
                <td>{x.employeename}</td>
                <td>{x.department}</td>
                <td>{x.dateofjoining}</td>
                <td>{x.photofilename}</td>
                <td>
                  <ButtonToolbar>
                    <Button className='mr-2' variant='info'
                      onClick={() => this.setState({ editModalShow: true, empId: x.EmployeeId, empName: x.employeename, dep: x.department, dateOfJoining: x.dateofjoining, photoname: x.photofilename })}
                    >Edit</Button>
                    <Button className='mr-2' variant='danger'
                      onClick={() => this.deleteEmployee(x.employeename)}>Delete</Button>

                    <EditEmployeeModal show={this.state.editModalShow} onHide={editModalClose} onUpdated={this.setIsUpdatedToTrue}
                      e_empid={empId} e_empname={empName} e_empdep={dep} e_doj={dateOfJoining} e_photoname={photoname} />

                  </ButtonToolbar>
                </td>
              </tr>
            )}

          </tbody>
        </Table>

        <ButtonToolbar>   <Button variant='primary' onClick={() => this.setState({ addModalShow: true })}>Add Employee</Button> </ButtonToolbar>

        <AddEmployeeModal show={this.state.addModalShow} onHide={addModalClose} onUpdated={this.setIsUpdatedToTrue} />
      </div>
      )
  }
}