import React, { Component } from 'react';
import fall_trees_scene from '../images/fall_trees_scene.jpg';  //some one said this is best since it can be re-used in the same component

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, formatCount: 'Zero', tags:['tag1','tag2','tag3'] }  //, imageUrl: require('../images/fall_trees_scene.jpg') }; // imageUrl... works too if not use import fall_trees_scene from '../images...'
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

  // "btn btn-primary m-2": m-2 means margin 2px which creates a bit space between Increment and Decrease button 
  // btn-sm: means small button.
  // badge-warning: display the button with yellow background.
  //

  // Under Line render, type 
  //   let classes = 'btn btn-sm badge-';
  //   classes += (this.state.currentCount === 0 ? 'warning' : 'secondary');
  // Select above 2 lines and right-click to select Quick action and refactoring
  // newMethod was created and then change newMethod to a meaningful name, i.e. getBadgesClasses
  getBadgesClasses() {
        let classes = 'btn btn-sm badge-';
        classes += (this.state.currentCount === 0 ? 'warning' : 'secondary');
        return classes;
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <img src={fall_trees_scene} height='100' width={100+50} alt="fall_trees_scene.jpg"></img>
        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
        <p>Formatted Count: {this.state.formatCount}</p>
        <button className="btn btn-primary m-2" onClick={this.incrementCounter}>Increment</button>
        <button className={this.getBadgesClasses()} onClick={this.decreaseCounter}>Decrease</button>
        <ul>
          {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}   {/*it equals ng-repeat. A. key={tag} to avoid 'Warning: Each child in a list should have a unique "key" prop.' B. being unique in this list is limited to this line scope */}
        </ul>
      </div>
    );
  }
   
}
