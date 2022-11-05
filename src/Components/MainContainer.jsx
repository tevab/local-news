import React from 'react';
import Lottie from 'lottie-react';
import loader from '../Animations/loader.json';
import Temperature from './Temperature';
import Time from './Time';
import styled from 'styled-components';

const StyledTemperature = styled(Temperature)`
  color: #f5f5f5;
  font-size: 110px;
  letter-spacing: -10px;
  text-shadow: 0px 4px 4px rgb(30 18 18 / 52%);
`;

const StyledTime = styled(Time)`
  font-size: 22px;
  color: #f5f5f5;
  text-shadow: 0px 4px 4px rgb(30 18 18 / 52%);
`;

function MainContainer(props, {className}) {

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
        (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {props.profile.length > 0 && (
              `Hi ${props.profile.name}!`
            )}
            <StyledTemperature 
              temperature={props.temperature} 
              degree={props.degree}
            />
            <StyledTime
              currentCountry={props.currentCountry}
              currentCity={props.currentCity}
              timezone={props.timezone}
              setCurrentTime={props.setCurrentTime}
            />
          </div>
        )
      }
    </div>
  )
}

export default MainContainer;