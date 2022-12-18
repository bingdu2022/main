import React, { Component } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';  //bd: added Routes, useNavigate
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';  // Why to use {..} because it's not defined as export default ...
import { Counters } from './components/Counters';  // Why to use {..} because it's not defined as export default ...

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
      </Layout>
    );
  }
}
