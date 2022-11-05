import React, { useState, useEffect, useRef } from 'react';
import RadioButton from './RadioButtom.jsx'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import firebase from "firebase";

function Settings(props) {

    const [signedIn, setSignedIn] = useState();
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const initClient = () => {
                gapi.auth2.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);

        props.setDegrees(props.degree)

        if (!props.degree) {
            props.setDegrees('Fahrenheit');
        };
    });
    
    useEffect(() => {
        if (props.profile.length === 0) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
            setEmail(props.profile.email);
        }
    }, [props.profile]);

    const onSuccess = (res) => {
        props.setProfile(res.profileObj);
        setSuccess(true);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        props.setProfile([]);
    };

    const db = firebase.firestore();

    const addValue = () => {
        db.collection("users")
        .doc(email)
        .set({
            email: email,
        }, {merge: true})
        .catch(function (error) {
            console.error("Error writing Value: ", error);
        });
    };

    const updateValue = (value) => {
        db.collection("users")
        .doc(email)
        .update({
            email: email,
            degrees: value,
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
    };

    const handleDegrees = e => {
        props.setDegrees(e.target.value);
        if (signedIn) {
            updateValue(e.target.value);
        };
    };

    useEffect(() => {
        if (signedIn) {
            const docRef = db.collection("users").doc(email);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    let data = doc.data().degrees;
                    props.setDegrees(data);
                } else {
                    console.log("Error getting document:", error);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        if (signedIn && success) {
            addValue();
        } else {
            return;
        }
    }, [signedIn]);

    return (
        <>
            {signedIn 
                ? 
                <GoogleLogout
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log out"
                onLogoutSuccess={logOut}
                onFailure={onFailure}
                />
                :
                <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                />
            } 
            
            {props.profile.name}
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
                    )
                )
            }
            {/* <FireStoreData /> */}
        </>
    )
}

export default Settings;