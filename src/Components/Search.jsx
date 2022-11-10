import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchWrapper = styled.div`
	background-color: #232028;
	border-radius: 8px;
	padding: 10px;
	width: 100%;
	max-width: 400px;
	box-shadow: rgb(32 18 55 / 32%) 0px 4px 4px;
	transition: all 200ms ease-in-out;
	z-index: 1;
	&:hover {
		background-color: #36323f;
	}
	@media (max-width: 760px) {
		max-width: 80%;
	}
`;

Search.propType = {
	search: PropTypes.string.isRequired,
};

function Search(props) {
	const handleFocus = () => {
		if (props.search !== props.query) {
			props.setSearch(props.query);
		} else {
			props.setSearch('');
		}
	};

	const handleBlur = () => {
		if (props.search) {
			props.setSearch(props.search);
		} else {
			props.setSearch(props.query);
		}
	};

	return (
		<SearchWrapper>
			<input
				type='text'
				id='search'
				onChange={props.handleSearchChange}
				onKeyDown={props.handleSearch}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={props.loading ? 'Loading...' : props.search}
				style={{
					backgroundColor: 'transparent',
					border: 0,
					outline: 0,
					textAlign: 'center',
					width: '100%',
					color: '#f5f5f5',
					fontSize: 18,
					letterSpacing: 0.4,
					textOverflow: 'ellipsis',
				}}
			/>
			<div
				style={{
					transition: 'all 400ms ease-in-out',
					height: props.error ? 20 : 0,
					opacitiy: props.error ? 1 : 0,
					overflow: 'hidden',
					textAlign: 'center',
					fontSize: 14,
					paddingTop: props.error ? 6 : 0,
					fontWeight: 'bold',
					color: 'rgb(245 245 245 / 61%)',
				}}
			>
				{props.error}
			</div>
		</SearchWrapper>
	);
}

Search.propTypes = {
	search: PropTypes.string,
	query: PropTypes.string,
	setSearch: PropTypes.func,
	handleSearchChange: PropTypes.func,
	handleSearch: PropTypes.func,
	loading: PropTypes.bool,
	error: PropTypes.string,
};

export default Search;
