import React from 'react';
import Lottie from 'lottie-react';
import loader from '../Animations/loader.json';
import Temperature from './Temperature';

function MainContainer(props) {

  return (
    <div 
      className="main-container" 
      style={{
        flex: '1 0 auto',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: `'Varela Round', Arial, sans-serif`,
        color: '#fff',
        fontSize: 110,
        letterSpacing: -10,
      }}>
      {props.loading 
        ? 
        <Lottie 
          animationData={loader} 
          loop={true} 
          style={{
            width: 200,
          }}  
        />
        : 
        <Temperature 
          temperature={props.temperature} 
          degree={props.degree}
        />
      }
    </div>
  )
}

export default MainContainer;