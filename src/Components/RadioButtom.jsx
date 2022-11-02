import React from 'react';

class RadioButton extends React.Component {
  render() {
    return (
      <>
        <input 
          type='radio' 
          name={this.props.id} 
          id={this.props.value} 
          value={this.props.value} 
          onChange={this.props.handleClick} 
          checked={this.props.value === this.props.buttonState}
        />
        <label htmlFor={this.props.value}>{this.props.value}</label>
      </>
    )
  }
}

export default RadioButton;