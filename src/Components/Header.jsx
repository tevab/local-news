import React from 'react';
import Search from './Search.jsx';
import Settings from './Settings.jsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSearch = styled(Search)`
  display: none;
`;

const StyledSettings = styled(Settings)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

class Header extends React.Component {
	render() {
		return (
			<div style={this.props.style}>
				<StyledSearch
					loading={this.props.loading}
					setSearch={this.props.setSearch}
					search={this.props.search}
					handleSearchChange={this.props.handleSearchChange}
					handleSearch={this.props.handleSearch}
					error={this.props.error}
					query={this.props.query}
				/>
				<StyledSettings
					degree={this.props.degree}
					setDegrees={this.props.setDegrees}
					weather={this.props.weather}
					setTemperature={this.props.setTemperature}
					degrees={this.props.degrees}
					profile={this.props.profile}
					setProfile={this.props.setProfile}
				/>
			</div>
		);
	}
}

Header.propTypes = {
	style: PropTypes.any,
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
