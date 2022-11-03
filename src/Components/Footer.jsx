import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div style={{flex: `0 1 auto`}}>
        &copy; All rights reserved {new Date().getFullYear()}
      </div>
    )
  }
}

export default Footer;