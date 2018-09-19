import React, { Component } from 'react';
import './App.css';

import Layout from './components/Layout'
import RegisterAccount from './components/RegisterAccount'
import CashDeposit from './components/CashDeposit'
import AccountSearch from './components/AccountSearch'

class App extends Component {
  render() {
    return (
      <Layout>
        <RegisterAccount/>
        <CashDeposit/>
        <AccountSearch/>
      </Layout>
    );
  }
}

export default App;
