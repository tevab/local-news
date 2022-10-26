import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <>
        <input type='text'
          onChange={this.props.handleSearchChange}
          onKeyDown={this.props.handleSearch}
          value={this.props.loading ? 'Loading...' : this.props.search}
        />
      </>
    )
  }
}

export default Search;