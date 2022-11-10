import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled.a`
	font-weight: 700;
	color: #f5f5f5;
`;

class Footer extends React.Component {
	render() {
		return (
			<div style={{flex: '0 1 auto', ...this.props.style}}>
        &copy; All rights reserved to <StyledLink href='https://github.com/tevab' target='_blank' rel="noreferrer">Teva Barzilay</StyledLink> {new Date().getFullYear()}
			</div>
		);
	}
}

Footer.propTypes = {
	style: PropTypes.any,
};

export default Footer;