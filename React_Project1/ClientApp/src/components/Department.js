//To make me show up:
//1. Create a clickable button: NavMenu.js: <NavItem> <NavLink tag={Link} className="text-dark" to="/department">Department</NavLink> </NavItem>
//2. Register url route: App.js: <Route path='/department' component={Department} />
//3. After doing #2 above, this seems auto-done: import { Department } from './components/Department'; in App.js

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';  //https://react-bootstrap.github.io/components/table/
/*th is used for table header cells while td is used for table data cells*/

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { departments: [] }
  }

  // REACT_APP_API is created in ClientApp/.env file based on iisSettings in launchSettings.json of WebAPI_Core project
  refreshDepartmentList() {
    fetch(process.env.REACT_APP_API + 'department')   
      .then(response => response.json())
      .then(data => {
        this.setState({ departments: data });
      });
  }

  componentDidMount() { this.refreshDepartmentList(); }

  componentDidUpdate() { this.refreshDepartmentList(); }


  render() {
    const { departments } = this.state;
    return (
      //<div className="mt-5 d-flex justify-content-left"> this is Department page.</div>
      <div>
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
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
                <td>Edit / Delete</td>
              </tr>)
            }
          </tbody>
        </Table>
      </div>
    )
  }
}