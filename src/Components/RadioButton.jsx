import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: #ddeaf6;
    border: 3px solid #ddeaf6;
    transition: all 200ms ease-in-out;
    margin-top: 2px;
  }
  &:hover {
    ::after {
      border: 3px solid #ddeaf6;
    }
 }
 &:focus-visible {    
    outline: 0;
    ::after {
      border-color: #70687c;
    }
 }
 &:checked {
    &::after {
       background-color: #988ea8;
    }
 }
`;

class RadioButton extends React.Component {
	render() {
		return (
			<div
				className={this.props.className}
				style={{
					marginRight: 10,
				}}
			>
				<Radio
					type='radio'
					name={this.props.id}
					id={this.props.value}
					value={this.props.value}
					onChange={this.props.handleClick}
					checked={this.props.value === this.props.buttonState}
					style={{
						marginRight: 4,
						cursor: 'pointer',
					}}
				/>
				<label
					htmlFor={this.props.value}
					style={{
						cursor: 'pointer',
					}}
				>
					{this.props.value}
				</label>
			</div>
		);
	}
}

RadioButton.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	handleClick: PropTypes.func,
	buttonState: PropTypes.string,
};

export default RadioButton;
