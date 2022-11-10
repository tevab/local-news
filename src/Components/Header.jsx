import React from 'react';
import Search from './Search.jsx';
import Settings from './Settings.jsx';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
	padding: 20px;
	flex: 0 1 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 760px) {
		flex-direction: column;
	}
`;

const StyledSettings = styled(Settings)`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	position: absolute;
	z-index: 0;
	right: 0;
	left: 0;
	align-content: center;
    align-items: center;
	@media (max-width: 760px) {
		position: static;
		padding: 8px;
	}
`;

function Header(props) {
	return (
		<Wrapper className={props.className}>
			<Search
				loading={props.loading}
				setSearch={props.setSearch}
				search={props.search}
				handleSearchChange={props.handleSearchChange}
				handleSearch={props.handleSearch}
				error={props.error}
				query={props.query}
			/>
			<StyledSettings
				degree={props.degree}
				setDegrees={props.setDegrees}
				weather={props.weather}
				setTemperature={props.setTemperature}
				degrees={props.degrees}
				profile={props.profile}
				setProfile={props.setProfile}
			/>
		</Wrapper>
	);
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
