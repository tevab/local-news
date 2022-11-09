import React, { useEffect } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

function Time(props) {

	useEffect(() => {
		const showTime = setInterval(() => {
			document.getElementById('time').innerHTML = moment().tz(props.timezone).format('dddd · MMMM D yyyy · h:mm A');
		}, 1000);
		props.setCurrentTime(moment().tz(props.timezone).format('H'));
		return () => clearInterval(showTime);
	}, [props.timezone]);

	return(
		<div className={props.className} id='time' style={props.style}></div>
	);
}

Time.propTypes = {
	timezone: PropTypes.string,
	setCurrentTime: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.any,
};

export default Time;