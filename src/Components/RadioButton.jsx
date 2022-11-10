import React, {useEffect, useState} from 'react';
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

function RadioButton(props) {

	const [width, setWidth] = useState(0);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => { 
			window.removeEventListener('resize', handleResize);
		};
	}, [setWidth]);

	return (
		<div
			className={props.className}
			style={{
				marginRight: 10,
			}}
		>
			<Radio
				type='radio'
				name={props.id}
				id={props.value}
				value={props.value}
				onChange={props.handleClick}
				checked={props.value === props.buttonState}
				style={{
					marginRight: 4,
					cursor: 'pointer',
				}}
			/>
			<label
				htmlFor={props.value}
				style={{
					cursor: 'pointer',
				}}
			>
				{width > 910 ? props.value : props.value[0]}
			</label>
		</div>
	);
}

RadioButton.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	handleClick: PropTypes.func,
	buttonState: PropTypes.string,
};

export default RadioButton;
