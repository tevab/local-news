import React from 'react';
import Search from './Search.jsx';
import PropTypes from 'prop-types';

class Header extends React.Component {
	render() {
		return (
			<div style={this.props.style} className={this.props.className}>
				
				<Search
					loading={this.props.loading}
					setSearch={this.props.setSearch}
					search={this.props.search}
					handleSearchChange={this.props.handleSearchChange}
					handleSearch={this.props.handleSearch}
					error={this.props.error}
					query={this.props.query}
				/>
			</div>
		);
	}
}

Header.propTypes = {
	style: PropTypes.any,
	className: PropTypes.string,
	loading: PropTypes.bool,
	setSearch: PropTypes.func,
	search: PropTypes.string,
	handleSearchChange: PropTypes.func,
	handleSearch: PropTypes.func,
	error: PropTypes.string,
	query: PropTypes.string,
	degree: PropTypes.string,
	setDegrees: PropTypes.any,
	weather: PropTypes.object,
	setTemperature: PropTypes.func,
	degrees: PropTypes.array,
	profile: PropTypes.any,
	setProfile: PropTypes.func,
};

export default Header;
