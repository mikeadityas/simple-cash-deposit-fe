import React, { Component } from 'react';

import './Layout.css';

class Layout extends Component {
  state = {  }
  render() {
    return (
      <div className="page">
        <div className="page__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;