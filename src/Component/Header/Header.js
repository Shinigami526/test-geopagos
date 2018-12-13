import React, { Component } from "react";

class Header extends Component {
  _isActive(step, index) {
    return step === index ? "active" : "";
  }

  render() {
    const { step } = this.props;

    return (
      <div className="steps-indicator">
        <div className={`steps-indicator-item ${this._isActive(step, 0)}`}>
          1
        </div>
        <div className="steps-indicator-separator" />
        <div className={`steps-indicator-item ${this._isActive(step, 1)}`}>
          2
        </div>
        <div className="steps-indicator-separator" />
        <div className={`steps-indicator-item ${this._isActive(step, 2)}`}>
          3
        </div>
      </div>
    );
  }
}

export default Header;
