//To make me show up:
//1. Create a clickable button: NavMenu.js: <NavItem> <NavLink tag={Link} className="text-dark" to="/department">Department</NavLink> </NavItem>
//2. Register url route: App.js: <Route path='/department' component={Department} />
//3. After doing #2 above, this seems auto-done: import { Department } from './components/Department'; in App.js

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { department: [] }
  }

  refreshDepartmentList() {
    fetch(process.env.REACT_APP_API + 'department')
      .then(response => response.json()).then(data => {
        this.setState({ department: data });
      });
  }

  componentDidMount() { this.refreshDepartmentList(); }

  componentDidUpdate() { this.refreshDepartmentList(); }


  render() {
    const { department } = this.state;
    return (
      //<div className="mt-5 d-flex justify-content-left"> this is Department page.</div>
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>DepartmentId</tr>
            <tr>DepartmentName</tr>
            <tr>Options</tr>
          </thead>
          <tbody>
            {department.map(x =>
              <tr key={x.DepartmentId}>
                <td>{x.DepartmentId}</td>
                <td>{x.DepartmentName}</td>
                <td>Edit / Delete</td>
              </tr>)
            }
           </tbody>
        </Table>
      </div>
    )
  }
}