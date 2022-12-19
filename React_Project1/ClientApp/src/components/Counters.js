import React, { Component } from 'react';
import { Counter } from './Counter';  // ./Counter tells it's at the same level folder to Counters.js and is at C:\bingdu2022.main\React_Project1\ClientApp\src\components\Counter.js

export class Counters extends Component {
  state = { counters: [{ id: 1, value: 4 }, { id: 2, value: 2 }] };
  render() {
    return (
      <div>
        <h2>Counters: links to 2 counters</h2>
        <h4>pass data from Counters to Counter; raise and handle events; multiple components in sync; functional components; lifecyle hooks </h4>

        {/*  <Counter />*/}
        {/*  <Counter></Counter>*/}
        {/*above = below which = ng-repeat*/}
        {this.state.counters.map(x => <Counter key={x.id} value={x.value}> <h4>Title</h4> </Counter>)};   {/*Counter (cannot be counter) comes from Line 2. state.counters comes from state = { counters: ..}*/}
        {/*the value={x.value} above is one of props and can be passed into Counter - see Counter.js > constructor(props) { . this.props.value ..} */}
        {/*the <h4>Title</h4> above is chidren of the props, so it can be passed to Counter if Counter.js has {this.props.children} - see Counter.js > */}
      </div>
      
      );
  };
}
