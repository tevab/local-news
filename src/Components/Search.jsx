import React from 'react';

function Search(props) {

  const handleBlur = () => {
    props.setSearch('');
  }

  return (
    <input type='text'
      onChange={props.handleSearchChange}
      onKeyDown={props.handleSearch}
      onFocus={handleBlur}
      value={props.loading ? 'Loading...' : props.search}
    />
  );
};

export default Search;