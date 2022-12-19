import React, { Component } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';  //bd: added Routes, useNavigate
import { Layout } from './components/Layout';   // from C:\bingdu2022.main\React_Project1\ClientApp\src\components\Layout.js
import { Home } from './components/Home';       // cannot be /home and have to be /Home
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter'; // Why to use {..} because it's not defined as export default ...
import { Counters } from './components/Counters';  
import { Lists } from './components/Lists';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/counters' component={Counters} />
        <Route path='/lists' component={Lists} />
      </Layout>
    );
  }
}
