import React from 'react';
import Search from './Search.jsx';
import Settings from './Settings.jsx';
import styled from 'styled-components';

const StyledSearch = styled(Search)`
  display: none;
`;

class Header extends React.Component {
  render() {
    return (
      <div style={{flex: `0 1 auto`}}>
        <StyledSearch 
          loading={this.props.loading}
          setSearch={this.props.setSearch}
          search={this.props.search}
          handleSearchChange={this.props.handleSearchChange}
          handleSearch={this.props.handleSearch}
        />
        {this.props.error}
        <Settings
          degree={this.props.degree}
          setDegrees={this.props.setDegrees}
          weather={this.props.weather}
          setTemperature={this.props.setTemperature}
          degrees={this.props.degrees}
          profile={this.props.profile}
          setProfile={this.props.setProfile}
        />
      </div>
    )
  }
}

export default Header;