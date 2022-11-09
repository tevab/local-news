import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {
	render() {
		return (
			<div style={{flex: '0 1 auto', ...this.props.style}}>
        &copy; All rights reserved to <a href='https://github.com/tevab' target='_blank' rel="noreferrer">Teva Barzilay</a> {new Date().getFullYear()}
			</div>
		);
	}
}

Footer.propTypes = {
	style: PropTypes.any,
};

export default Footer;