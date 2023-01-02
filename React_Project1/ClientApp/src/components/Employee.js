import React, { Component, PureComponent } from 'react';
import { Table } from 'react-bootstrap';
export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { employees: [] };
  }

  getAndPopluateEmployees() {
    fetch(process.env.REACT_APP_API + 'employee')
      .then(res => res.json()).then(data => { this.setState({ employees: data }) }).catch(error => alter('Failed!'));
  }
  componentDidMount() { this.getAndPopluateEmployees(); };
  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps); console.log('this.props', this.props);
    if (prevProps.resouce !== this.props.resource) { this.getAndPopluateEmployees(); };
  }

  // why x.employeename is because API EmployeeController.cs intentionally lowercases it to testing purpose. 
  // it proves it has to be EXACTLY like that or cannot be use database table query output formats (e.g. EmployeeName etc).
  render() {
    const { employees } = this.state;
    //console.log('employees', employees);
    return (
      //<div className="mt-5 d-flex justify-content-left"> Employee page</div>
      <div>
        <Table className=''>
          <thead>
            <tr>
              <th>EmployeeId</th>
              <th>EmployeeName</th>
              <th>Department</th>
              <th>DateOfJoining</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(x =>
              <tr key={x.EmployeeId}>
                <td>{x.EmployeeId}</td>
                <td>{x.employeename}</td>
                <td>{x.department}</td>
                <td>{x.dateofjoining}</td>
            </tr>
          )}

          </tbody>
        </Table>

      </div>
      )
  }
}