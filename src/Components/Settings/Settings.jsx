import React from 'react';
import RadioButton from '../RadioButton/RadioButtom.jsx'

function Settings(props) {

    return (
        <>
            {
                props.degrees.map(
                    (degree, i) => (
                        <RadioButton
                            key={i}
                            id='degrees'
                            value={degree}
                            handleClick={props.handleDegrees}
                            buttonState={props.degree}
                        />
                    )
                )
            }
        </>
    )
}

export default Settings;