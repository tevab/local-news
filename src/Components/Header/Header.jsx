import React from 'react';
import Search from '../Search/Search';

class Header extends React.Component {
  render() {
    return (
      <>
        <Search 
          search={this.props.search}
          handleChange={this.props.handleChange}
          handleSearch={this.props.handleSearch}
        />
      </>
    )
  }
}

export default Header;