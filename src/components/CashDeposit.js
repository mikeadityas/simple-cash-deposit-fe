import React, { Component } from 'react';

import './CashDeposit.css'
import axiosCashDeposit from '../axios-cash-deposit';

import Notification from './Layout/Notification';

class CashDeposit extends Component {
  state = {
    externalsource:"",
    fromCustomer:false,
    internalsource:1,
    depositdest:1,
    amount:0.0,
    isDepositing:false,
    notification: {
      show:false,
      type:0,
      content:""
    }
  }

  fromCustomerChangedHandler = () => {
    this.setState({fromCustomer:!this.state.fromCustomer});
  }

  externalsourceChangedHandler = (event) => {
    this.setState({externalsource:event.target.value});
  }

  internalsourceChangedHandler = (event) => {
    this.setState({internalsource:event.target.value});
  }

  depositdestChangedHandler = (event) => {
    this.setState({depositdest:event.target.value});
  }

  amountChangedHandler = (event) => {
    this.setState({amount:event.target.value});
  }

  makeDeposit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({isDepositing:true});
    let newDeposit = {}
    if(this.state.fromCustomer) {
      newDeposit = {
        internalsource:parseInt(this.state.internalsource,10),
        depositdest:parseInt(this.state.depositdest,10),
        amount:parseFloat(this.state.amount)
      }
    } else {
      newDeposit = {
        externalsource:this.state.externalsource,
        depositdest:parseInt(this.state.depositdest,10),
        amount:parseFloat(this.state.amount)
      }
    }
    axiosCashDeposit.post('/transaction',newDeposit)
                    .then((response) => {
                      let newNotification = {...this.state.notification}
                      newNotification.show = true;
                      newNotification.type = 1;
                      newNotification.content = "Deposit success!";
                      this.setState({
                        externalsource:"",
                        fromCustomer:false,
                        internalsource:1,
                        depositdest:1,
                        amount:0.0,
                        isDepositing:false,
                        notification:newNotification
                      });
                    })
                    .catch(err => {
                      let newNotification = {...this.state.notification}
                      newNotification.show = true;
                      newNotification.type = 0;
                      newNotification.content = err.response.data.error;
                      this.setState({
                        externalsource:"",
                        fromCustomer:false,
                        internalsource:1,
                        depositdest:1,
                        amount:0.0,
                        isDepositing:false,
                        notification:newNotification
                      });
                    })
  }

  dismissNotificationHandler = () => {
    let newNotification = {...this.state.notification}
    newNotification.show = false;
    newNotification.type = 1;
    newNotification.content = "";
    this.setState({notification:newNotification})
  }

  render() {
    let notification = null    

    if(this.state.notification.show) {
      if(this.state.notification.type === 0) {
        const classes = "notification notification--danger"
        notification = (
          <Notification
            classes = {classes}
            content = {this.state.notification.content}
            dismiss = {this.dismissNotificationHandler}
          />
        )
      }
      else if(this.state.notification.type === 1) {
        const classes = "notification notification--success"
        notification = (
          <Notification
            classes = {classes}
            content = {this.state.notification.content}
            dismiss = {this.dismissNotificationHandler}
          />
        )
      }
    }

    let depositSource = null
    if(this.state.fromCustomer) {
      depositSource = (
        <div className="input-group">
          <label className="label" htmlFor="internalsource">Customer Account Number</label>
          <input
            id="internalsource"
            className="input"
            type="text"
            value={this.state.internalsource}
            onChange={(event) => this.internalsourceChangedHandler(event)}
            placeholder="123"
          />
        </div>
      )
    } else {
      depositSource = (
        <div className="input-group">
          <label className="label" htmlFor="externalsource">Non-Customer Email Address</label>
          <input
            id="externalsource"
            className="input"
            type="email"
            value={this.state.externalsource}
            onChange={(event) => this.externalsourceChangedHandler(event)}
            placeholder="john@mail.com"
          />
        </div>
      )
    }

    return (
      <div className="section--cash-deposit">
        <div className="card" style={{minHeight:"34em"}}>
          <h2>Cash Deposit</h2>
          {notification}
          <form onSubmit={(event) => this.makeDeposit(event)}>
            <h3 style={{marginBottom:"0"}}>From</h3>
            
            <div className="customer-toggle">
              <div className="customer-toggle__label">
                Non-Customer
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={this.fromCustomerChangedHandler}
                  checked={this.state.fromCustomer}/>
                <span className="slider round"></span>
              </label>
              <div className="customer-toggle__label">
                Customer
              </div>
            </div>
            
            {depositSource}
            
            <h3 style={{marginBottom:"0",marginTop:"1.5em"}}>To</h3>
            <div className="input-group">
              <label className="label" htmlFor="depositdest">Customer Account Number</label>
              <input
                id="depositdest"
                className="input"
                type="text"
                value={this.state.depositdest}
                onChange={(event) => this.depositdestChangedHandler(event)}
                placeholder="1234567890123456"
                required
              />
            </div>

            <h3 style={{marginBottom:"0",marginTop:"1.5em"}}>Amount</h3>
            <div className="input-group">
              <label className="label" htmlFor="amount">IDR</label>
              <input
                id="amount"
                className="input"
                type="number"
                value={this.state.amount}
                onChange={(event) => this.amountChangedHandler(event)}
                placeholder="10000"
                step="100"
                min="10000"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--success"
              disabled={this.state.isDepositing}
            >
              <i
                className={this.state.isDepositing ? "fas fa-circle-notch fa-spin" : "fas fa-circle-notch hidden"}
                style={{marginRight:'0.3em'}}
              ></i>
              Deposit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CashDeposit;