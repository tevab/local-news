import React, {useState, useEffect} from 'react';
import RadioButton from './RadioButton.jsx';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';
import firebase from 'firebase';
import styled from 'styled-components';
import SettingsIcon from '../Icons/SettingsIcon.jsx';
import PropTypes from 'prop-types';

const SettingsWrapper = styled.div`
	overflow: hidden;
	opacity: ${props => props.collapseSettings ? 1 : 0};
	z-index: ${props => props.collapseSettings ? 1 : -1};
	width: ${props => props.collapseSettings ? '194px' : 0};
	transition: all 400ms ease-in-out;
	@media (max-width: 760px) {
		order: 1;
		width: ${props => props.collapseSettings ? '81px' : 0};
	}
`;

const SettingsContainer = styled.div`
	width: 194px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 30px;
	color: #f5f5f5;
	font-size: 14;
	margin: 3px 0 2px 6px;
	@media (max-width: 760px) {
		width: 81px;
	}
`;

const StyledAvatar = styled.img`
	width: 28px;
	height: 28px;
	border-radius: 50%;
	margin-right: 10px;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
	width: 36px;
	height: 36px;
	padding-top: 8px;
	cursor: pointer;
	transition: all 400ms ease-in-out;
	transform: ${props => props.collapseSettings ? 'rotate(-359deg)' : null};
	margin-right: 2px;
	margin-left: 2px;
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
		<div className={props.className}>
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
								fontSize: 14,
							}}
						>
							<StyledAvatar
								src={props.profile.imageUrl}
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
				<SettingsWrapper
					collapseSettings={collapseSettings}
				>
					<SettingsContainer>
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
					</SettingsContainer>
				</SettingsWrapper>
				<StyledSettingsIcon
					onClick={toggleCollapse}
					collapseSettings={collapseSettings}
				/>
			</div>
		</div>
	);
}

Settings.propTypes = {
	setDegrees: PropTypes.func,
	degree: PropTypes.string,
	profile: PropTypes.any,
	setProfile: PropTypes.func,
	className: PropTypes.string,
	degrees: PropTypes.array,
	collapseSettings: PropTypes.bool,
};

export default Settings;
