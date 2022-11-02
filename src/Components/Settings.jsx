import React from 'react';
import RadioButton from './RadioButtom.jsx'
import { useGetData } from '../Hooks/useGetData.jsx';
import Add from './Add.jsx';
import FireStoreData from './FireStoreData.jsx';

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
            <Add />
            <FireStoreData />
        </>
    )
}

export default Settings;