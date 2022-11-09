import React from 'react';
import PropTypes from 'prop-types';

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
		<div
			style={{
				backgroundColor: '#36323d',
				borderRadius: 8,
				padding: 10,
				width: '100%',
				maxWidth: 400,
				boxShadow: 'rgb(85 72 107 / 32%) 0px 4px 4px',
			}}
		>
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
		</div>
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
