import React, { Component } from 'react';
import { Counter } from './Counter';  // ./Counter tells it's at the same level folder to Counters.js and is at C:\bingdu2022.main\React_Project1\ClientApp\src\components\Counter.js

export class Counters extends Component {
  state = { counters: [{ id: 1, value: 4 }, { id: 2, value: 2 }] };

  handleDeleteCounter = (x) => {   /* add x or countId to know which counter in the state.counters to remove*/
    console.log('Even Handler Called: ', x)  /*click Delete Me button to show it comes here: it should show Even Handler Called: 1*/

    /*we do not change state in React. Instead, we create a new instance of state.counters*/
    const counters = this.state.counters.filter(y => y.id !== x);
    this.setState({ counters: counters });   /*it means use our const counters to overwrite state.counters. Here we can simplify it to this.setState({ counters }); since both use the same name counters */

  };

  render() {
    return (
      <div>
        <h2>Counters: links to 2 counters</h2>
        <h4>pass data from Counters to Counter; raise and handle events; multiple components in sync; functional components; lifecyle hooks </h4>

        {/*  <Counter />*/}
        {/*  <Counter></Counter>*/}
        {/*above = below which = ng-repeat*/}
        {this.state.counters.map(x => <Counter key={x.id} value={x.value} otherWayPassArgCounterId={x.id} onDelete={this.handleDeleteCounter}> <h4>Passing Counter #{x.id} from Counters.js:</h4> </Counter>)};   {/*Counter (cannot be counter) comes from Line 2. state.counters comes from state = { counters: ..}*/}
        {/*the value={x.value} above is one of props and can be passed into Counter - see Counter.js > constructor(props) { . this.props.value ..} */}
        {/*Counters.js or the <h4>Counter #{counter.id}</h4> above is chidren of the Counter's props, so it can be passed to Counter if Counter.js has {this.props.children} - see Counter.js > */}
      </div>
      
      );
  };
}
