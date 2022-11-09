import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
		fetch(
			'https://source.unsplash.com/1600x900/?' + props.weatherDescription,
		).then(response => {
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
		});
	};

	useEffect(() => {
		if (props.weatherDescription) {
			searchPhotos();
		}
	}, [props.weatherDescription]);

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
}

CrossFade.propTypes = {
	weatherDescription: PropTypes.string,
};

export default CrossFade;
