import React, { Component } from 'react';

import './RegisterAccount.css'
import axiosCashDeposit from '../axios-cash-deposit';

import Notification from './Layout/Notification';

class RegisterAccount extends Component {
  state = {
    idcardno:"",
    name:"",
    email:"",
    isRegistering:false,
    notification: {
      show:false,
      type:0,
      content:""
    }
  }

  nameChangedHandler = (event) => {
    this.setState({name:event.target.value});
  }

  idcardnoChangedHandler = (event) => {
    this.setState({idcardno:event.target.value});
  }

  emailChangedHandler = (event) => {
    this.setState({email:event.target.value});
  }

  registerAccount = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({isRegistering:true});
    const newAccount = {
      idcardno:this.state.idcardno,
      name:this.state.name,
      email:this.state.email
    }
    axiosCashDeposit.post('/account',newAccount)
                    .then((response) => {
                      let newNotification = {...this.state.notification}
                      newNotification.show = true;
                      newNotification.type = 1;
                      newNotification.content = "Register success! New Account Number: "+response.data.accountid;
                      this.setState({
                        idcardno:"",
                        name:"",
                        email:"",
                        isRegistering:false,
                        notification:newNotification
                      });
                    })
                    .catch(err => {
                      let newNotification = {...this.state.notification}
                      newNotification.show = true;
                      newNotification.type = 0;
                      newNotification.content = err.response.data.error;
                      this.setState({
                        idcardno:"",
                        name:"",
                        email:"",
                        isRegistering:false,
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
    
    return (
      <div className="section--register-account">
        <div className="card" style={{minHeight:"34em"}}>
          <h2>Register Account</h2>
          {notification}
          <form onSubmit={(event) => this.registerAccount(event)}>
            <div className="input-group">
              <label className="label" htmlFor="idcardno">ID Card Number</label>
              <input
                id="idcardno"
                className="input"
                type="text"
                value={this.state.idcardno}
                onChange={(event) => this.idcardnoChangedHandler(event)}
                placeholder="1234567890123456"
                maxLength="16"
                minLength="16"
                required
              />
            </div>

            <div className="input-group">
              <label className="label" htmlFor="name">Customer Name</label>
              <input
                id="name"
                className="input"
                type="text"
                value={this.state.name}
                onChange={(event) => this.nameChangedHandler(event)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="input-group">
              <label className="label" htmlFor="email">Customer Email Address</label>
              <input
                id="email"
                className="input"
                type="email"
                value={this.state.email}
                onChange={(event) => this.emailChangedHandler(event)}
                placeholder="john@domain.com"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--success"
              disabled={this.state.isRegistering}
            >
              <i
                className={this.state.isRegistering ? "fas fa-circle-notch fa-spin" : "fas fa-circle-notch hidden"}
                style={{marginRight:'0.3em'}}
              ></i>
              Register
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterAccount;