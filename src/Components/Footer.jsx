import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div style={{flex: `0 1 auto`, ...this.props.style}}>
        &copy; All rights reserved to <a href='https://github.com/tevab' target='_blank'>Teva Barzilay</a> {new Date().getFullYear()}
      </div>
    )
  }
}

export default Footer;