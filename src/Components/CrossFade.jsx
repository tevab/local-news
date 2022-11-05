import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BackgroundImage = styled.img`
    position: absolute;
    z-index: -2;
    object-fit: cover;
    transition: all 400ms ease-in-out;
`;

function CrossFade(props) {
    
    const [imageOne, setImageOne] = useState('');
    const [imageOneFade, setImageOneFade] = useState(false);
    const [imageTwo, setImageTwo] = useState('');
    const [imageTwoFade, setImageTwoFade] = useState(false);

    function searchPhotos(){
        fetch(`https://source.unsplash.com/1600x900/?` + props.weatherDescription + ' ' + props.timeOfDay)
        .then((response)=> {   
            if (!imageOne) {
                setImageOne(response.url);
                setImageOneFade(false);
                setImageTwoFade(true);
                setTimeout(() => {
                    setImageTwo('');
                }, '1000');
            } else {
                setImageTwo(response.url);
                setImageTwoFade(false);
                setImageOneFade(true);
                setTimeout(() => {
                    setImageOne('');
                }, '1000');
            }
        }) 
    }

    useEffect(() => {
        searchPhotos()
    }, []);

    useEffect(() => {
        if (props.weatherDescription && props.timeOfDay) {
            searchPhotos();
        } else {
            return;
        }
    }, [props.timeOfDay]);

    return (
        <>
            <BackgroundImage
                src={imageOne} 
                style={{
                    opacity: imageOneFade ? 0 : 1,
                }}
            />
            <BackgroundImage 
                src={imageTwo} 
                imageTwoFade={imageTwoFade} 
                style={{
                    opacity: imageTwoFade ? 0 : 1,
                }}
            />
        </>
    );
};

export default CrossFade;