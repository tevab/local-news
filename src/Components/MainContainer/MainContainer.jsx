import React from 'react';

function MainContainer(props) {

  return (
    <div className="main-container">
      {props.loading ? 'loading' : props.weather?.main?.temp}
    </div>
  )
}

export default MainContainer;