//  CounterChild.js can not be displayed alone or as a clickable tab in the top navigation bar as CounterParent does.
//  the reason is all of its data come from its caller. For example, the first rendering {this.getBadgeClass()} 
//  looks for this.props.counterChild which is undefined before its caller calls it.

import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

export class CounterChild extends Component {
  /*this is a controlled Component and does not have its own data which will be passed in by its caller*/

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    if (prevProps.counterChild.value !== this.props.counterChild.value) {
      // Ajax call and get new data from the servser
    };
  }

  getBadgeClass() {  /*concatenates strings and return a final string for a className*/
    let className = 'badge m2 badge-';
    /*console.log('this.props', this.props);*/
    className += this.props.counterChild.value === 0 ? 'warning' : 'primary';
    return className;
  }

  formatCount() {  /*return a value or a new value based on the input value*/
    const count = this.props.counterChild.value;
    return count === 0 ? 'Zero' : this.props.counterChild.value;
    let location = useLocation();
    console.log('useLocation(): ', location);

  }
  render() {
    console.log('CounterChild: this.props:', this.props);
    return (
      <div>
        <span className={this.getBadgeClass()}>{this.formatCount()} </span>  {/*simpaly displays data that are passed in by the caller*/}

        {/*onClick raises an event (a asynchronous call/func defined by its caller) */}
        {/*by using an arrow function ()=> .. having an argument: (this.props.counterChild) which can be figured out (to use counterChild.id) by its caller*/}
        <button className='btn btn-primary btn-sm m-2' onClick={() => this.props.onIncrement(this.props.counterChild)} >Increment</button>

        {/*the below (this.props.counterChild.id) = (this.props.counterChild) which means React is smart to know what to look for*/}
        <button className='btn btn-secondary btn-sm m-2' onClick={() => this.props.onRemoveMe(this.props.counterChild.id)} >Remove Me</button>

      </div>
      );
  };
}
