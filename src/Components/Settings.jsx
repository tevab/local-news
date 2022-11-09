import React, {useState, useEffect} from 'react';
import RadioButton from './RadioButton.jsx';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';
import firebase from 'firebase';
import styled from 'styled-components';
import SettingsIcon from '../Icons/SettingsIcon.jsx';
import PropTypes from 'prop-types';

const Navbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

function Settings(props) {
	const [signedIn, setSignedIn] = useState();
	const [success, setSuccess] = useState(false);
	const [email, setEmail] = useState('');
	const [collapseSettings, setCollapseSettings] = useState(false);

	useEffect(() => {
		const initClient = () => {
			gapi.auth2.init({
				clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: '',
			});
		};

		gapi.load('client:auth2', initClient);

		props.setDegrees(props.degree);

		if (!props.degree) {
			props.setDegrees('Fahrenheit');
		}
	});

	useEffect(() => {
		if (props.profile.length === 0) {
			setSignedIn(false);
		} else {
			setSignedIn(true);
			setEmail(props.profile.email);
		}
	}, [props.profile]);

	const onSuccess = res => {
		props.setProfile(res.profileObj);
		setSuccess(true);
	};

	const onFailure = err => {
		console.log('failed', err);
	};

	const logOut = () => {
		props.setProfile([]);
	};

	const db = firebase.firestore();

	const addValue = () => {
		db.collection('users')
			.doc(email)
			.set({
				email,
			}, {merge: true})
			.catch(error => {
				console.error('Error writing Value: ', error);
			});
	};

	const updateValue = value => {
		db.collection('users')
			.doc(email)
			.update({
				email,
				degrees: value,
			})
			.catch(error => {
				console.error('Error updating document: ', error);
			});
	};

	const handleDegrees = e => {
		props.setDegrees(e.target.value);
		if (signedIn) {
			updateValue(e.target.value);
		}

		setTimeout(() => {
			setCollapseSettings(current => !current);
		}, 1000);
	};

	useEffect(() => {
		if (signedIn) {
			const docRef = db.collection('users').doc(email);

			docRef.get().then(doc => {
				if (doc.exists) {
					const data = doc.data().degrees;
					props.setDegrees(data);
				} else {
					(error => {
						console.log('Error getting document:', error);
					});
				}
			}).catch(error => {
				console.log('Error getting document:', error);
			});
		}

		if (signedIn && success) {
			addValue();
		}
	}, [signedIn]);

	const toggleCollapse = () => {
		setCollapseSettings(current => !current);
	};

	return (
		<Navbar className={props.className}>
			{signedIn
				? <GoogleLogout
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					onLogoutSuccess={logOut}
					onFailure={onFailure}
					render={renderProps => (
						<button
							onClick={renderProps.onClick}
							style={{
								backgroundColor: 'transparent',
								border: 0,
								color: '#f5f5f5',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								height: 30,
								cursor: 'pointer',
								marginRight: 14,
								fontSize: 14,
							}}
						>
							<img
								src={props.profile.imageUrl}
								style={{
									width: 28,
									height: 28,
									borderRadius: '50%',
									marginRight: 10,
								}}
							/>
                            Log Out
						</button>
					)}
				/>
				: <GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					onSuccess={onSuccess}
					onFailure={onFailure}
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
					render={renderProps => (
						<button
							onClick={renderProps.onClick}
							style={{
								backgroundColor: 'transparent',
								border: 0,
								color: '#f5f5f5',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								height: 30,
								cursor: 'pointer',
								marginRight: 14,
								fontSize: 14,
							}}
						>
                            Sign In
						</button>
					)}
				/>
			}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				<SettingsIcon
					onClick={toggleCollapse}
					style={{
						width: 28,
						height: 28,
						paddingTop: 5,
						cursor: 'pointer',
						transition: 'all 1000ms ease-in-out',
						transform: collapseSettings ? 'rotate(359deg)' : null,
						marginRight: 2,
					}}
				/>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						height: 30,
						color: '#f5f5f5',
						transition: 'all 1000ms ease-in-out',
						opacity: collapseSettings ? 1 : 0,
						zIndex: collapseSettings ? 1 : -1,
						fontSize: 14,
						margin: '0 0 2px 6px',
					}}
				>
					{
						props.degrees.map(
							(degree, i) => (
								<RadioButton
									key={i}
									id='degrees'
									value={degree}
									handleClick={handleDegrees}
									buttonState={props.degree}
								/>
							),
						)
					}
				</div>
			</div>
		</Navbar>
	);
}

Settings.propTypes = {
	setDegrees: PropTypes.func,
	degree: PropTypes.string,
	profile: PropTypes.any,
	setProfile: PropTypes.func,
	className: PropTypes.string,
	degrees: PropTypes.array,
};

export default Settings;
