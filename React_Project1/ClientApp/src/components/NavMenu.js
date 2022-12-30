import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import earthsoft from '../images/EarthSoft.svg';
import earthsoftIco from '../images/EarthIcon.ico';
import { CounterParent } from './CounterParent';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,

      totalCount: [{ value: 0 }]
      //As comparison, in const SomeComponent = () => { const [someState, setSomeState] = useState('starting value'); ...}
      //The key difference between someSate and this.state.totalCount is that the initial value of the state defined by useState can be anything you want it to be.
      //It no longer has to be an object as the this.state.totalCount requires. A string, a number, an object, undefined, null - anything goes!

    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleTotalCount = (x) => { /*pass function using props in React Router Link: https://stackoverflow.com/questions/66911401/how-can-i-pass-function-using-props-in-react-router-link*/
    const totalCount = { ...this.state.totalCount };
    console.log("NevMenu totalCount: ", totalCount);
    totalCount[0].value++;  /*doing it by ignoring passed in x*/

    totalCount[0].value = x;  /*show a number passed in from the gavigated tab CounterParent*/

    this.setState({ totalCount });
    console.log("NavMenu: handleTotalCount: totalCount: ", this.state.totalCount);
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">NavMenu.js: <img src={earthsoft}></img> <img src={earthsoftIco} width='20' height='20'></img> React_Project1</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink> 
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counters">Counters</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/lists">Lists</NavLink>
                </NavItem>
                <NavItem>
                  {/*pass data to navigated component using Link and NavLink: https://stackoverflow.com/questions/60123984/react-router-pass-props-from-one-component-to-another-using-navlink*/}
                  {/*pass function using props in React Router Link: https://stackoverflow.com/questions/66911401/how-can-i-pass-function-using-props-in-react-router-link*/}
                  <NavLink tag={Link} className="text-dark" to={{ pathname: "/counter-parent", state: { totalCount: 4,second:2 }, data: { handleTotalCount: this.handleTotalCount } }} >Counter Parent <span className='badge badge-pill badge-secondary'> {this.state.totalCount[0].value}</span> </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/department">Department</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/employee">Employee</NavLink>
                </NavItem>

              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
