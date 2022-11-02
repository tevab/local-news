import React, {useState, useEffect} from 'react';
import RadioButton from './RadioButtom.jsx'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import firebase from "firebase";
import Add from './Add.jsx';
import FireStoreData from './FireStoreData.jsx';

function Settings(props) {

    const [profile, setProfile] = useState([]);
    const [signedIn, setSignedIn] = useState();
    const [email, setEmail] = React.useState("");

    useEffect(() => {
        const initClient = () => {
                gapi.client.init({
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
    }, [signedIn]);

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile([]);
    };

    // useEffect(() => {
    //     
    // }, [onSuccess])

    const db = firebase.firestore();

    const addValue = () => {
        db.collection("users")
        .doc(email)
        .set({
            email: email,
        })
        .then(function () {
            console.log("Value successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing Value: ", error);
        });
    };

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
                            handleClick={props.handleDegrees}
                            buttonState={props.degree}
                        />
                    )
                )
            }
            {/* <input onBlur={getValue} type='text' /> */}
            <button type='button' onClick={addValue}>
                Add
            </button>
            <FireStoreData />
        </>
    )
}

export default Settings;