import React, { Component } from 'react';
import { Counter } from './Counter';

export class Counters extends Component {
  state = {}
  render() {
    return (
      <div>
        <h2>Counters: links to 2 counters</h2>
        <h4>pass data, raise and handle events; multiple components in sync; functional components; lifecyle hooks </h4>
        <Counter></Counter>
        <Counter></Counter>
      </div>
      
      );
  };
}
