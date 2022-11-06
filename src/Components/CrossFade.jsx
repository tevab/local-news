import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const BackgroundImage = styled.div`
    position: absolute;
    z-index: -2;
    background-size: cover;
    transition: opacity 400ms ease-in-out;
    height: 100vh;
    width: 100vw;
`;

function CrossFade(props) {
    
    const [imageOne, setImageOne] = useState('');
    const [imageOneFade, setImageOneFade] = useState(false);
    const [imageTwo, setImageTwo] = useState('');
    const [imageTwoFade, setImageTwoFade] = useState(false);

    const searchPhotos = () => {
        fetch(`https://source.unsplash.com/1600x900/?` + props.weatherDescription + ' ' + props.timeOfDay)
        .then((response)=> {   
            if (!imageOne) {
                setImageOne(response.url);
                setImageOneFade(false);
                setImageTwoFade(true);
                setImageTwo('');
            } else if (!imageTwo) {
                setImageTwo(response.url);
                setImageTwoFade(false);
                setImageOneFade(true);
                setImageOne('');
            }
        }) 
    }

    useEffect(() => {
        if (props.weatherDescription|| props.timeOfDay) {
            searchPhotos();
            console.log(props.weatherDescription + ' ' + props.timeOfDay);
        }
    }, [props.weatherDescription && props.timeOfDay]);

    return (
        <>
            <BackgroundImage
                imageOneFade={imageOneFade}
                style={{
                    opacity: imageOneFade ? 0 : 1,
                    backgroundImage: `url(${imageOne})`,
                }}
            />
            <BackgroundImage 
                imageTwoFade={imageTwoFade} 
                style={{
                    opacity: imageTwoFade ? 0 : 1,
                    backgroundImage: `url(${imageTwo})`,
                }}
            />
        </>
    );
};

export default CrossFade;