import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <>
        &copy; All rights reserved {new Date().getFullYear()}
      </>
    )
  }
}

export default Footer;