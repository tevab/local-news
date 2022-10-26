import React, {useState} from 'react';
import { useEffect } from 'react';
import RadioButton from '../RadioButton/RadioButtom.jsx'

function Settings(props) {

    const degrees = ['Fahrenheit', 'Celsius'];

    const handleDegrees = (e, f, c) => {
        props.setDegrees(e.target.value);
        let kelvin = props.weather.main.temp;
        const klevinToFahrenheit = (kelvin - 273.15) * 1.8 + 32;
        const klevinToCelsius = kelvin - 273.15;
        if (props.degree === 'Fahrenheit') {
          let value = (Math.round(klevinToCelsius) + 'C');
          props.setTemperature(value);
        } else {
          let value = (Math.round(klevinToFahrenheit) + 'F');
          props.setTemperature(value);
        }
    };

    return (
        <>
            {
                degrees.map(
                    (degree, i) => (
                        <RadioButton
                            key={i}
                            id='degrees'
                            value={degree}
                            handleClick={handleDegrees}
                            buttonState={props.degree}
                        />
                    )
                )
            }
        </>
    )
}

export default Settings;