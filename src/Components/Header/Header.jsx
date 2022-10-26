import React from 'react';
import Search from '../Search/Search';

class Header extends React.Component {
  render() {
    return (
      <>
        <Search 
          loading={this.props.loading}
          search={this.props.search}
          handleSearchChange={this.props.handleSearchChange}
          handleSearch={this.props.handleSearch}
        />
      </>
    )
  }
}

export default Header;