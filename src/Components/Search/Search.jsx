import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <>
        <input type='text'
          onChange={this.props.handleChange}
          onKeyDown={this.props.handleSearch}
        />
      </>
    )
  }
}

export default Search;