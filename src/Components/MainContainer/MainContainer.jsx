import React from 'react';

function MainContainer(props) {

  return (
    <div className="main-container">
      {props.loading ? 'loading' : props.temperature}
    </div>
  )
}

export default MainContainer;