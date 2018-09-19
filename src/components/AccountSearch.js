import React, { Component } from 'react';

import './AccountSearch.css';

import axiosCashDeposit from '../axios-cash-deposit';
import AccountDetail from './AccountSearch/AccountDetail';

class AccountSearch extends Component {
  state = {
    accountid:"",
    accountbrief:{},
    showBrief:false,
    isFound:false,
    isSearching:false,
    isGettingHistory:false,
    showHistory:false,
    transhist:[]
  }

  searchQueryQueue = null

  searchHandler = (event) => {
    this.setState({accountid:event.target.value,isSearching:true,showBrief:false,isFound:false,transhist:[],showHistory:false});
    
    clearTimeout(this.searchQueryQueue);

    this.searchQueryQueue = setTimeout(() => {
      if(this.state.accountid !== "") {
        axiosCashDeposit.get(`/account/${this.state.accountid}`)
          .then((resp) => {
            this.setState({accountbrief:resp.data,isSearching:false,showBrief:true,isFound:true})
          })
          .catch((err) => {
            this.setState({isSearching:false,showBrief:true,isFound:false})
          })
      }
    }, 500);
  }

  viewDepositHistoryHandler = () => {
    this.setState({isGettingHistory:true,showHistory:true});
    axiosCashDeposit.get(`/account/${this.state.accountid}/history`)
                    .then((resp) => {
                      this.setState({transhist:resp.data,isGettingHistory:false,showHistory:true});
                    })
                    .catch((err) => {
                      console.log(err);
                      this.setState({isGettingHistory:false,showHistory:false});
                    })
  }

  render() {
    let accountDetail = null;
    if((this.state.showBrief || this.state.isSearching) && this.state.accountid !== "") {
      accountDetail = (
        <AccountDetail
          accountbrief = {this.state.accountbrief}
          isFound = {this.state.isFound}
          isSearching = {this.state.isSearching}
          viewhistory = {this.viewDepositHistoryHandler}
          isGettingHistory = {this.state.isGettingHistory}
          showHistory = {this.state.showHistory}
          history = {this.state.transhist}
        />
      )
    }

    return (
      <div className="section--account-search">
        <div className="card" style={{minHeight:"34em"}}>
          <h2>Account Search</h2>
          <div className="input-group">
              <label className="label" htmlFor="accountsearch">Customer Account Number</label>
              <input
                id="accountsearch"
                className="input input--search"
                type="search"
                value={this.state.accountid}
                onChange={(event) => this.searchHandler(event)}
                placeholder="123"
              />
            </div>
            
            {accountDetail}
            
        </div>
      </div>
    );
  }
}

export default AccountSearch;