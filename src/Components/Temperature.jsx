import React from 'react';
import PropTypes from 'prop-types';

class Temperature extends React.Component {
	render() {
		return (
			<div 
				style={{
					display: 'flex',
					alignContent: 'flex-end',
					alignItems: 'flex-end',
					...this.props.style
				}}
				className={this.props.className}
			>
				{this.props.temperature} 
				<div 
					style={{
						fontSize: 60,
						marginBottom: 14,
						marginLeft: 12,
					}}
				>
					{this.props.degree[0]}
				</div>
			</div>
		);
	}
}

Temperature.propTypes = {
	style: PropTypes.any,
	className: PropTypes.string,
	temperature: PropTypes.number,
	degree: PropTypes.string,
};

export default Temperature;