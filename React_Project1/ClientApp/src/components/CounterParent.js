//To make me show up:
//1. Create a clickable button: NavMenu.js: <NavItem> <NavLink tag={Link} className="text-dark" to="/counter-parent">Counter Parent</NavLink> </NavItem>
//2. Register url route: App.js: <Route path='/counter-parent' component={CounterParent} />

/*It calls ./CounterChild.js*/

import React, { Component } from 'react';
import { CounterChild } from './CounterChild';  /*It calls ./CounterChild.js*/
import cloneDeep from 'lodash/cloneDeep';

export class CounterParent extends Component {


  state = {
    counters: [{ id: 0, value: 2 }, { id: 1, value: 1 }],
    counters_origin_values: [{ id: 0, value: 2 }, { id: 1, value: 1 }]
  };

  handleIncrement =(x) => {
    console.log(x);
    const counters = [...this.state.counters];
    const index = counters.indexOf(x);
    //counters[index] = { ...x };
    counters[index].value ++;
    this.setState({ counters });
  }

  handleRemoveMe = (x) => {  /*add x is to know which CounterChild is removed*/
    // It removes the CounterChild of x Id that is created by {this.state.counters.map(x => <CounterChild ...}

    const counters = this.state.counters.filter(y => y.id != x);
    this.setState({ counters });
  }

  /*for single source of true: the values of all the counters come from the same source so that one click can reset all */
  handleResetTo0 = () => {
    /*Reset all the values of CounterChilds to 0*/

    const counters = this.state.counters.map(x => { x.value = 0; return x; });
    this.setState({ counters });
  }

  handleReset = () => {
    /* Reset all the values of CounterChilds to the original values (not neccessaryily 0) of this.state.counters, where I simply create its copy in counters_origin_values*/
    // It can even bring back all the CounterChilds that are removed by handleRemoveMe

    //-------------------- https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
    //Using spread [... ] for array or {... } for object will clone your array/object but it is a shallow copy.
    //So, it may works at the first and then counters_origin_values is actually changed to the value of this.state.counters
    //  as if counters_origin_values points to the address of this.state.counters

    //const counters = [ ...this.state.counters_origin_values ];
    //----------------------

    //------------------------
    ////the below is also an object clone, but it does not work here or breaks because clicking handleReset strangely generates the error of
    ////'this.state.counters.map is not a function at CounterParent.render(CounterParent.js: ...)  '
    //// Object.assign is a function which modifies and returns the target object

    //const counters = Object.assign({}, this.state.counters_origin_values);
    //--------------------

    ////-------------------------------
    //// below is a dirty deep copy of an object and it works in terms of reset to its original values. Recommend to use _.cloneDeep(value) of lodash.
    ////JSON.stringify/parse only work with Number and String and Object literal without function or Symbol properties.
    ////deepClone work with all types, function and Symbol are copied by reference.

    //const counters = JSON.parse(JSON.stringify(this.state.counters_origin_values));
    ////------------------

    //the below is the best for deep clone or real clone of an object by import cloneDeep from 'lodash/cloneDeep';
    const counters = cloneDeep(this.state.counters_origin_values);
    //JSON.stringify/parse only work with Number and String and Object literal without function or Symbol properties.
    //deepClone work with all types, function and Symbol are copied by reference.

    this.setState({ counters });
  }

  render() {
    return (
      <div>
        <button className='btn btn-third m-2' onClick={this.handleReset} >Reset</button>
        <button className='btn btn-third m-2' onClick={this.handleResetTo0}>Reset To 0</button>
        {this.state.counters.map(x => <CounterChild key={x.id} a={x.id} counterChild={x} onIncrement={this.handleIncrement} onRemoveMe={this.handleRemoveMe}  ></CounterChild>)};

      </div>
    );
  };
}