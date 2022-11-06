import React from 'react';

function Search(props) {

  const handleFocus = () => {
    props.setSearch('');
  }

  return (
    <>
        <input type='text' id='search'
          onChange={props.handleSearchChange}
          onKeyDown={props.handleSearch}
          onFocus={handleFocus}
          value={props.loading ? 'Loading...' : props.search}
        />
        {props.error}
    </>
  );
};

export default Search;