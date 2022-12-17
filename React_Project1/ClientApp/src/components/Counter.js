import React, { Component } from 'react';
import fall_trees_scene from '../images/fall_trees_scene.jpg';  //some one said this is best since it can be re-used in the same component

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, formatCount: 'Zero' }  //, imageUrl: require('../images/fall_trees_scene.jpg') }; // imageUrl... works too.
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decreaseCounter = this.decreaseCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
      formatCount: this.state.currentCount + 1 === 0 ? 'Zero' : this.state.currentCount + 1
    });
  }

  decreaseCounter() {
    this.setState({
      currentCount: this.state.currentCount - 1,
      formatCount: this.state.currentCount -1 === 0 ? 'Zero' : this.state.currentCount - 1
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <img src={fall_trees_scene} height='100' width={100+50} alt="fall_trees_scene.jpg"></img>
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
        <p>Formatted Count: {this.state.formatCount}</p>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        <button className="btn btn-secondery" onClick={this.decreaseCounter}>Decrease</button>
      </div>
    );
  }
}
