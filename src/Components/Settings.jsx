import React, { useState, useEffect, useRef } from 'react';
import RadioButton from './RadioButtom.jsx'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import firebase from "firebase";

function Settings(props) {

    const [profile, setProfile] = useState([]);
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
    });
    
    useEffect(() => {
        if (profile.length === 0) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
            setEmail(profile.email);
        }
    }, [profile]);

    useEffect(() => {
        if (signedIn) {
            addValue();
        } else {
            return;
        }
    }, [success]);

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        setSuccess(true);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile([]);
    };

    const db = firebase.firestore();

    const addValue = () => {
        db.collection("users")
        .doc(email)
        .set({
            email: email,
            degrees: props.degree,
        })
        // .then(function () {
        //     console.log("Value successfully written!");
        // })
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
        // .then(function () {
        //     console.log("Document successfully updated!");
        // })
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
                    console.log(data);
                    props.setDegrees(data);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Error getting document:", error);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
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
            
            {profile.name}
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