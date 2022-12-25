//React_Project1 structure or Components:
//Start or main web page: ClientApp / public / index.html: ... <div id=” root”></div> ...
//Sub page 1: ClientApp / src / App.js will replace < div id =”root”></div >
//  •	App.js:
//    o	Layout.js > NavMenu.js
  //    	Home.js
  //    	Counter.js
  //    	FetchData.js
  //    	Counters.js > Counter.js
  //    	Lists.js
  //    	CounterParent.js > CounterChild.js

import React, { Component } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';  //bd: added Routes, useNavigate
import { Layout } from './components/Layout';   // from C:\bingdu2022.main\React_Project1\ClientApp\src\components\Layout.js
import { Home } from './components/Home';       // cannot be /home and have to be /Home
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter'; // Why to use {..} because it's not defined as export default ...
import { Counters } from './components/Counters';  
import { Lists } from './components/Lists';
import { CounterParent } from './components/CounterParent';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />    {/*Route here is a clickable tab in the top menu bar*/}
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/counters' component={Counters} />
        <Route path='/lists' component={Lists} />
        <Route path='/counter-parent' component={CounterParent} />
      </Layout>
    );
  }
}
