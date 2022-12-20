import React, { Component } from 'react';

export class Lists extends Component {
state = { shopping_lists: [{ id: 0, value: 2 }, { id: 1, value: 0 }] };

render(){
  return (
    <div>
      <ul> {this.state.shopping_lists.map(x => <li key={x.id}>{x.value}</li>)} </ul>
      <ul> {this.state.shopping_lists.map(x => <li key={x.id} value={x.value} selected={true} />)} </ul>
    </div>
    )

}

}

