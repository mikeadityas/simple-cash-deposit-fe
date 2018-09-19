import React from 'react';

const Notification = (props) => {
  return (
    <div className={props.classes}>
      <i className="fas fa-times" onClick={props.dismiss}></i>
      {props.content}
    </div>
  );
}

export default Notification;