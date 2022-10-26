import React, {useState} from 'react';
import RadioButton from '../RadioButton/RadioButtom.jsx'

function Settings(props) {

    const degrees = ['Fahrenheit', 'Celsius'];

    const handleDegrees = (e, value) => {
        props.setDegrees(e.target.value);
        let kelvin = props.weather.main.temp;
        const klevinToFahrenheit = (kelvin - 273.15) * 1.8 + 32;
        const klevinToCelsius = kelvin - 273.15;
        if (props.degree === 'Fahrenheit') {
          let value = (Math.round(klevinToCelsius) + 'C');
          console.log(value);
        } else {
          let value = (Math.round(klevinToFahrenheit) + 'F');
          console.log(value);
        };
        
    };

    return (
        <>
            {
                degrees.map(
                    (degree, i) => (
                        <RadioButton
                            key={i}
                            degree={degree}
                            handleClick={handleDegrees}
                        />
                    )
                )
            }
        </>
    )
}

export default Settings;