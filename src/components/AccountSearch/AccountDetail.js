import React from 'react';

import './AccountDetail.css';

const accountDetail = (props) => {
  let content = null;
  if(props.isFound) {
    let historyBtnClasses = "fas fa-history fa-lg";
    if(props.isGettingHistory) {
      historyBtnClasses = "fas fa-sync fa-lg fa-spin";
    }

    const formattedBalance  = "Rp"+props.accountbrief.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) {
      return m === ',' ? '.' : ',';
     });
    content = (
      <React.Fragment>
        <p>Account ID #{props.accountbrief.accountid}</p>
        <p><i className="far fa-address-card fa-lg"></i> {props.accountbrief.idcardno}</p>
        <p><i className="far fa-user fa-lg"></i> {props.accountbrief.name}</p>
        <p><i className="far fa-envelope fa-lg"></i> {props.accountbrief.email}</p>
        <p><i className="far fa-money-bill-alt fa-lg"></i> {formattedBalance}</p>
        <hr/>
        <h3>Action</h3>
        <button
          className="btn btn--action"
          onClick={props.viewhistory}
          disabled={props.isGettingHistory}
        >
          <i className={historyBtnClasses} style={{marginRight: "0.3em"}}></i>View Deposit History
        </button>
      </React.Fragment>
    )
  } else if(props.isSearching) {
    content = (
      <h3>Searching account, please wait...</h3>
    )
  } else {
    content = (
      <h3>Account not found</h3>
    )
  }
  
  let history = null;
  if(props.showHistory) {
    if(props.history.length !== 0) {
      let records = null
      records = props.history.map((hist) => {
        const transtime = new Date(hist.transtime)
        const strtime = transtime.toString();
        const formattedAmount = "Rp"+hist.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/[,.]/g, function (m) {
          return m === ',' ? '.' : ',';
         });
        return (
          <tr key={hist.transid}>
            <td>#{hist.transid}</td>
            <td>{strtime}</td>
            <td>{hist.internalsource === 0 ? hist.externalsource : hist.name+" (#"+hist.internalsource+")"}</td>
            <td>{formattedAmount}</td>
          </tr>
        )
      })
      
      history = (
        <React.Fragment>
          <h3>Deposit History</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Time</th>
                  <th>From</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {records}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )
    } else if (props.isGettingHistory) {
      history = (
        <h3>Getting transaction record...</h3>
      )
    } else if(props.history.length === 0) {
      history = (
        <h3>No transaction record found</h3>
      )
    }  
  }

  return (
    <div className="card card--invert" style={{marginTop:"0.5em"}}>
      {content}
      {history}
    </div>
  );
}

export default accountDetail;