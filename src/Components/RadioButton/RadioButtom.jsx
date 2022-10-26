import React from 'react';

class RadioButton extends React.Component {
  render() {
    return (
      <>
        <input type='radio' name='degrees' id={this.props.degree} value={this.props.degree} onClick={this.props.handleClick}/>
        <label htmlFor={this.props.degree}>{this.props.degree}</label>
      </>
    )
  }
}

export default RadioButton;