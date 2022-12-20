import React, { Component } from 'react';
import fall_trees_scene from '../images/fall_trees_scene.jpg';  //some one said this is best since it can be re-used in the same component

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {  // constructor can access 'this'
    super(props);  //constructor has to call its parent class in React Component since here this child class or 'export class Counter' extends Component
    this.state = { currentCount: (this.props.value === undefined ? 0 : this.props.value), formatCount: 'Zero', tags: ['tag1', 'tag2', 'tag3'] }  //, imageUrl: require('../images/fall_trees_scene.jpg') }; // imageUrl... works too if not use import fall_trees_scene from '../images...'
    // the above this.state scope is limited to this class while props can be passed between classes

    // the below tells a function in js is an object which may have methods, i.e. .bind(..)
    this.incrementCounter = this.incrementCounter.bind(this);  //this.incrementCounter.bind(this) returns a new instance with 'this' parameter passing of incrementCounter, so this line recreates the function of incrementCounter() {..} to incrementCounter(this) {...}

    // The below line is not needed anymore after it's created with a special way: decreaseCounter = () => {..}
    //this.decreaseCounter = this.decreaseCounter.bind(this);
  }

  incrementCounter() {  // this is an event handler for onClick of a button
    this.setState({   //This is a way to change a state property in React and the change is an asyncronus call that render(){return{.}} will update the state properies asyncronuslly in a future
      currentCount: this.state.currentCount + 1,
      formatCount: this.state.currentCount + 1 === 0 ? 'Zero' : this.state.currentCount + 1
    });
  }

  decreaseCounter = (args) => {  // this is (an arrow function) an event handler for onClick of a button and it doesn't need this.decreaseCounter.bind(this) in constructor
    this.setState({
      currentCount: this.state.currentCount - 1,
      formatCount: this.state.currentCount -1 === 0 ? 'Zero' : this.state.currentCount - 1
    });
  }


  // Passing an argument to an event handler
  passArgToDecreaseCounter = () => { this.decreaseCounter({ id: 1 }) };

  // "btn btn-primary m-2": m-2 means margin 2px which creates a bit space between Increment and Decrease button 
  // btn-sm: means small button.
  // badge-warning: display the button with yellow background.
  // js: true && 'hi' = hi    true && 'hi' && 1 = 1

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

  // Conditional list: a line of message or a list: mixing of js and html in a method or function
  renderTags() {
    if (this.state.tags.length === 0) return 'a line of message.';
    return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>   /*it equals ng-repeat. A. key={tag} to avoid 'Warning: Each child in a list should have a unique "key" prop.' B. Key being unique in this list is limited to this line scope*/
  }

  render() {
    console.log(this.props);  /*to see how a caller can use props to pass in things*/
    return (
      <div>

        {/*Counter (child) asks its caller's (Counters or this.props) to do onDelete (start an event) and then its parent Counters.js does onDelete={this.handleDeleteCounter} event*/}
        <h3>Counter: <span> <button className="btn btn-primary m-2"
          onClick={() => { this.props.onDelete(this.props.otherWayPassArgCounterId) }}   /*()=> ... is a way of taking the passing arg from its caller*/
        >Delete Me</button>  </span> </h3>

        <h4>rendering counts and lists; conditional rendering, handling events, updating the State</h4>
        <img src={fall_trees_scene} height='100' width={100+50} alt="fall_trees_scene.jpg"></img>
        <p>This is a simple example of a React component.</p>

        {this.props.children}   {/*see Counters.js > <h4>Counter #{x.id}</h4> which passes Counter #{x.id} here over '.children' */}
        <h4>Another way of passing Counter id from Counters.js: {this.props.otherWayPassArgCounterId}</h4>  {/*similar to .children, it's another way to pass properties from Counters.js to Counter.js*/}

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>
        <p>Formatted Count: {this.state.formatCount}</p>
        <button className="btn btn-primary m-2" onClick={this.incrementCounter}>Increment</button>

        {/*Passing an argument to an event handler*/}
        <button className={this.getBadgesClasses()} onClick={this.passArgToDecreaseCounter}>Decrease</button>  {/*onClick takes an event handler or a reference of a function, so no () after the function name*/}
        <button className={this.getBadgesClasses()} onClick={() => { this.decreaseCounter({ id: 1 }) }}>Decrease</button>  {/*onClick takes an event handler AND passes in arguments. This line works the same as the above + defining passArgToDecreaseCounter */}

        <ul>
          {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}   {/*it equals ng-repeat. A. key={tag} to avoid 'Warning: Each child in a list should have a unique "key" prop.' B. Key being unique in this list is limited to this line scope */}
        </ul>
        {this.renderTags()}    {/* this.renderTags() has to end with () since it's a normal function call*/}

      </div>
    );
  }
   
}
